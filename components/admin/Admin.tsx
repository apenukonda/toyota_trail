import React, { useContext, useEffect, useMemo, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { Department, Designation } from '../../types';
import supabaseClient from '../../context/supabaseClient';
import AdminDashboard from './admin_dashboard';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { LayoutDashboard, BarChart3, Users, Video, FileText, Menu, X } from 'lucide-react';

type ProfileRow = {
  id: string;
  user_id: string;
  name: string;
  department?: string | null;
  designation?: string | null;
  score?: number | null;
};

const Admin: React.FC = () => {
  const { currentUser } = useContext(AppContext);
  const [profiles, setProfiles] = useState<ProfileRow[]>([]);
  const [selectedView, setSelectedView] = useState<'dashboard' | 'stats' | 'registrations'>('stats');
  const [selectedAnalytics, setSelectedAnalytics] = useState<'none' | 'videoCompletion' | 'mdMessage'>('none');
  const [showBy, setShowBy] = useState<'department' | 'designation'>('department');
  const [departmentFilter, setDepartmentFilter] = useState<string>('All');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Fetch all profiles (live snapshot)
  const fetchProfiles = async () => {
    const { data, error } = await supabaseClient
      .from('profiles')
      .select('id, user_id, name, department, designation, score');
    if (error) {
      console.error('Error fetching profiles:', error.message || error);
      return;
    }
    setProfiles(data || []);
  };

  useEffect(() => {
    fetchProfiles();

    const channel = supabaseClient.channel('public:profiles')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'profiles' }, () => {
        fetchProfiles();
      })
      .subscribe();

    return () => {
      supabaseClient.removeChannel(channel);
    };
  }, []);

  // video completion rows
  const [videoRows, setVideoRows] = useState<Array<any>>([]);
  const [videoDeptFilter, setVideoDeptFilter] = useState<string>('All');
  const [videoDesigFilter, setVideoDesigFilter] = useState<string>('All');
  const [mdRows, setMdRows] = useState<Array<any>>([]);
  const [mdDeptFilter, setMdDeptFilter] = useState<string>('All');
  const [mdDesigFilter, setMdDesigFilter] = useState<string>('All');

  const fetchVideoCompletions = async () => {
    const { data, error } = await supabaseClient
      .from('user_tasks')
      .select('user_id, task_id, completed_steps')
      .eq('task_id', 'task6');
    if (error) {
      console.error('Error fetching video completions:', error.message || error);
      return;
    }
    const rows = data || [];
    if (rows.length === 0) {
      setVideoRows([]);
      return;
    }

    const userIds = Array.from(new Set(rows.map((r: any) => r.user_id)));
    const { data: profilesData, error: profilesError } = await supabaseClient
      .from('profiles')
      .select('id, user_id, name, department, designation')
      .in('id', userIds as any[]);
    if (profilesError) {
      console.error('Error fetching profiles for video completions:', profilesError.message || profilesError);
    }

    const profileMap = new Map<string, any>();
    (profilesData || []).forEach((p: any) => profileMap.set(p.id, p));

    const joined = rows.map((r: any) => {
      const profile = profileMap.get(r.user_id) || null;
      const videosCompleted = Math.floor((r.completed_steps || 0) / 7);
      const rowId = `${r.user_id}_${r.task_id}`;
      return {
        id: rowId,
        user_id: r.user_id,
        employee_id: profile?.user_id || r.user_id,
        name: profile?.name || r.user_id,
        department: profile?.department || 'Unknown',
        designation: profile?.designation || 'Unknown',
        completed_steps: r.completed_steps || 0,
        videosCompleted,
      };
    });
    setVideoRows(joined);
  };

  const fetchMDCompletions = async () => {
    const { data, error } = await supabaseClient
      .from('user_tasks')
      .select('user_id, task_id, completed_steps, score')
      .eq('task_id', 'task1');
    if (error) {
      console.error('Error fetching MD completions:', error.message || error);
      return;
    }
    const rows = data || [];
    if (rows.length === 0) {
      setMdRows([]);
      return;
    }

    const userIds = Array.from(new Set(rows.map((r: any) => r.user_id)));
    const { data: profilesData, error: profilesError } = await supabaseClient
      .from('profiles')
      .select('id, user_id, name, department, designation')
      .in('id', userIds as any[]);
    if (profilesError) console.error('Error fetching profiles for MD completions', profilesError);

    const profileMap = new Map<string, any>();
    (profilesData || []).forEach((p: any) => profileMap.set(p.id, p));

    const joined = rows.map((r: any) => {
      const profile = profileMap.get(r.user_id) || null;
      const finished = (r.completed_steps || 0) >= 7;
      return {
        id: `${r.user_id}_${r.task_id}`,
        user_id: r.user_id,
        employee_id: profile?.user_id || r.user_id,
        name: profile?.name || r.user_id,
        designation: profile?.designation || 'Unknown',
        department: profile?.department || 'Unknown',
        score: r.score || 0,
        finished,
      };
    });
    setMdRows(joined);
  };

  useEffect(() => {
    fetchVideoCompletions();
    fetchMDCompletions();
    const ch = supabaseClient.channel('public:user_tasks')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'user_tasks' }, () => {
        fetchVideoCompletions();
        fetchMDCompletions();
      })
      .subscribe();

    return () => supabaseClient.removeChannel(ch);
  }, [profiles]);

  const exportToCSV = (rows: Array<any>, filename = 'export.csv') => {
    if (!rows || rows.length === 0) {
      const blob = new Blob([''], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);
      return;
    }

    const keys = Object.keys(rows[0]);
    const header = keys.join(',');
    const csv = [header].concat(rows.map(r => keys.map(k => {
      const v = r[k] === undefined || r[k] === null ? '' : String(r[k]);
      return `"${v.replace(/"/g, '""')}"`;
    }).join(','))).join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const departments = useMemo(() => Object.values(Department), []);
  const designations = useMemo(() => Object.values(Designation), []);

  const PLAN_BY_DEPARTMENT: Record<string, number> = {
    [Department.AUTO_PRODUCTION]: 41,
    [Department.ENVIRONMENT]: 4,
    [Department.FINANCE_AND_ACCOUNTS]: 14,
    [Department.FST_AND_DOJO_TRAINING]: 22,
    [Department.FULL_TIME_DIRECTORS]: 2,
    [Department.GD_ASSEMBLY]: 143,
    [Department.GD_MACHINING]: 150,
    [Department.GD_LINE_SUPPLY]: 28,
    [Department.HEALTH_AND_SAFETY]: 15,
    [Department.HR_AND_ADMIN]: 29,
    [Department.INFORMATION_SYSTEMS]: 9,
    [Department.LEARNING_DEVELOPMENT]: 20,
    [Department.MAINTENANCE]: 92,
    [Department.MANUFACTURING_ENGG]: 24,
    [Department.PC_AND_LOGISTICS]: 122,
    [Department.PRODUCTION_ENGG]: 21,
    [Department.PRODUCTION_SUPPORT_COMMON]: 16,
    [Department.PURCHASE_AND_BUSINESS_PLANNING]: 16,
    [Department.QUALITY]: 86,
    [Department.SHOP_FLOOR_DEVELOPMENT]: 7,
    [Department.SUPPLY_CHAIN_MANAGEMENT]: 46,
    [Department.TNGA_ASSEMBLY]: 327,
    [Department.TNGA_LINE_SUPPLY]: 41,
    [Department.TNGA_MACHINING]: 98,
    [Department.TOOL_MGMT_AND_ENGG]: 35,
    [Department.UTILITY_DEPARTMENT]: 37,
  };

  const PLAN_BY_DESIGNATION: Record<string, number> = {
    'TRAINEE': 923,
    'OPERATOR': 188,
    'ASSISTANT ENGINEER': 32,
    'CONTRACT ENGINEER': 28,
    'ENGINEER': 6,
    'SENIOR ENGINEER': 125,
    'ASSISTANT MANAGER': 35,
    'DEPUTY MANAGER': 32,
    'MANAGER': 17,
    'TOP MANAGEMENT': 25,
    'OTHERS': 34,
  };

  const registrationsByDept = useMemo(() => {
    const map = new Map<string, number>();
    profiles.forEach(p => {
      const key = p.department || 'Unknown';
      map.set(key, (map.get(key) || 0) + 1);
    });
    return Array.from(map.entries()).map(([key, count]) => ({ key, count }));
  }, [profiles]);

  const registrationsByDesig = useMemo(() => {
    const map = new Map<string, number>();
    profiles.forEach(p => {
      const key = p.designation || 'Unknown';
      map.set(key, (map.get(key) || 0) + 1);
    });
    return Array.from(map.entries()).map(([key, count]) => ({ key, count }));
  }, [profiles]);

  const employeesByDept = useMemo(() => {
    return (departments as string[]).map(key => ({ key, total: PLAN_BY_DEPARTMENT[key] ?? 0 }));
  }, [departments]);

  const employeesByDesig = useMemo(() => {
    return (designations as string[]).map(key => ({ key, total: PLAN_BY_DESIGNATION[key] ?? 0 }));
  }, [designations]);

  const filteredProfiles = profiles.filter(p => departmentFilter === 'All' ? true : (p.department || 'Unknown') === departmentFilter);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`${isSidebarOpen ? 'w-64' : 'w-0'} transition-all duration-300 bg-white shadow-lg overflow-hidden flex flex-col`}>
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold text-gray-800">ADMINS</h1>
            <button 
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden p-1 hover:bg-gray-100 rounded"
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="flex flex-col items-center mt-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-2xl font-bold mb-3">
              {currentUser?.name?.substring(0, 2).toUpperCase() || 'AD'}
            </div>
            <h2 className="text-lg font-semibold text-gray-800">{currentUser?.name || 'Admin'}</h2>
            <p className="text-sm text-teal-500">Administrator</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <button
            onClick={() => { setSelectedView('dashboard'); setSelectedAnalytics('none'); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
              selectedView === 'dashboard' ? 'bg-red-500 text-white' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <LayoutDashboard size={20} />
            <span className="font-medium">Dashboard</span>
          </button>

          <button
            onClick={() => { setSelectedView('stats'); setSelectedAnalytics('none'); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
              selectedView === 'stats' ? 'bg-red-500 text-white' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <BarChart3 size={20} />
            <span className="font-medium">Stats (Charts & Table)</span>
          </button>

          <button
            onClick={() => { setSelectedView('registrations'); setSelectedAnalytics('none'); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
              selectedView === 'registrations' ? 'bg-red-500 text-white' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Users size={20} />
            <span className="font-medium">Registrations Summary</span>
          </button>

          <button
            onClick={async () => {
              setSelectedAnalytics('videoCompletion');
              await fetchVideoCompletions();
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
              selectedAnalytics === 'videoCompletion' ? 'bg-red-500 text-white' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Video size={20} />
            <span className="font-medium">Video Completion Analytics</span>
          </button>

          <button
            onClick={async () => { setSelectedAnalytics('mdMessage'); await fetchMDCompletions(); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
              selectedAnalytics === 'mdMessage' ? 'bg-red-500 text-white' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <FileText size={20} />
            <span className="font-medium">MD Message Completion</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="bg-white shadow-sm p-4 flex items-center gap-4 border-b border-gray-200">
          {!isSidebarOpen && (
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <Menu size={24} className="text-gray-700" />
            </button>
          )}
          <h2 className="text-2xl font-bold text-gray-800">
            {selectedAnalytics === 'videoCompletion' ? 'Video Completion Analytics' :
             selectedAnalytics === 'mdMessage' ? 'MD Message Completion Status' :
             selectedView === 'dashboard' ? 'Dashboard' :
             selectedView === 'stats' ? 'Stats (Charts & Table)' :
             'Registrations Summary'}
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-full mx-auto">
            {selectedView === 'dashboard' && selectedAnalytics === 'none' ? (
              <AdminDashboard />
            ) : selectedAnalytics === 'videoCompletion' ? (
              <section>
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <label className="text-sm font-medium text-gray-700">Department:</label>
                      <select value={videoDeptFilter} onChange={e => setVideoDeptFilter(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent">
                        <option value="All">All</option>
                        {departments.map(d => <option key={d} value={d}>{d}</option>)}
                      </select>
                    </div>

                    <div className="flex items-center gap-2">
                      <label className="text-sm font-medium text-gray-700">Designation:</label>
                      <select value={videoDesigFilter} onChange={e => setVideoDesigFilter(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent">
                        <option value="All">All</option>
                        {designations.map(d => <option key={d} value={d}>{d}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <div className="flex items-center justify-end mb-2">
                      <button onClick={() => {
                        const rows = videoRows.filter(r => (videoDeptFilter === 'All' || r.department === videoDeptFilter) && (videoDesigFilter === 'All' || r.designation === videoDesigFilter)).map(r => ({ employee_id: r.employee_id, name: r.name, department: r.department, designation: r.designation, videosCompleted: r.videosCompleted }));
                        exportToCSV(rows, 'video_completion.csv');
                      }} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium">Export CSV</button>
                    </div>

                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr className="text-left text-sm font-medium text-gray-700">
                          <th className="px-4 py-3">Employee ID</th>
                          <th className="px-4 py-3">Name</th>
                          <th className="px-4 py-3">Department</th>
                          <th className="px-4 py-3">Designation</th>
                          <th className="px-4 py-3">Videos Completed</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        {videoRows.filter(r => (videoDeptFilter === 'All' || r.department === videoDeptFilter) && (videoDesigFilter === 'All' || r.designation === videoDesigFilter)).map(r => (
                          <tr key={r.id} className="hover:bg-gray-50">
                            <td className="px-4 py-3 text-sm">{r.employee_id}</td>
                            <td className="px-4 py-3 text-sm">{r.name}</td>
                            <td className="px-4 py-3 text-sm">{r.department}</td>
                            <td className="px-4 py-3 text-sm">{r.designation}</td>
                            <td className="px-4 py-3 text-sm font-medium">{r.videosCompleted}</td>
                          </tr>
                        ))}
                        {videoRows.filter(r => (videoDeptFilter === 'All' || r.department === videoDeptFilter) && (videoDesigFilter === 'All' || r.designation === videoDesigFilter)).length === 0 && (
                          <tr>
                            <td colSpan={5} className="px-4 py-8 text-center text-gray-500">No video completion data found for selected filters.</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>
            ) : selectedAnalytics === 'mdMessage' ? (
              <section className="space-y-6">
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Department-wise Completion</h3>
                  <div style={{ width: '100%', height: 500 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={(departments as string[]).map(d => ({
                          category: d,
                          registered: registrationsByDept.find(r => r.key === d)?.count ?? 0,
                          finished: mdRows.filter(m => m.department === d && m.finished).length,
                        }))}
                        margin={{ top: 24, right: 30, left: 0, bottom: 60 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="category" tick={{ fontSize: 11 }} angle={-45} textAnchor="end" interval={0} height={80} />
                        <YAxis />
                        <Tooltip />
                        <Legend verticalAlign="top" align="right" />
                        <Bar dataKey="registered" fill="#2563EB" name="Registered" />
                        <Bar dataKey="finished" fill="#10B981" name="Finished" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Designation-wise Completion</h3>
                  <div style={{ width: '100%', height: 500 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={(designations as string[]).map(d => ({
                          category: d,
                          registered: registrationsByDesig.find(r => r.key === d)?.count ?? 0,
                          finished: mdRows.filter(m => m.designation === d && m.finished).length,
                        }))}
                        margin={{ top: 24, right: 30, left: 0, bottom: 80 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="category" tick={{ fontSize: 11 }} angle={-45} textAnchor="end" interval={0} height={100} />
                        <YAxis />
                        <Tooltip />
                        <Legend verticalAlign="top" align="right" />
                        <Bar dataKey="registered" fill="#2563EB" name="Registered" />
                        <Bar dataKey="finished" fill="#10B981" name="Finished" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <label className="text-sm font-medium text-gray-700">Department:</label>
                      <select value={mdDeptFilter} onChange={e => setMdDeptFilter(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent">
                        <option value="All">All</option>
                        {departments.map(d => <option key={d} value={d}>{d}</option>)}
                      </select>
                    </div>

                    <div className="flex items-center gap-2">
                      <label className="text-sm font-medium text-gray-700">Designation:</label>
                      <select value={mdDesigFilter} onChange={e => setMdDesigFilter(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent">
                        <option value="All">All</option>
                        {designations.map(d => <option key={d} value={d}>{d}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <div className="flex items-center justify-end mb-2">
                      <button onClick={() => {
                        const rows = mdRows.filter(r => (mdDeptFilter === 'All' || r.department === mdDeptFilter) && (mdDesigFilter === 'All' || r.designation === mdDesigFilter)).map(r => ({ employee_id: r.employee_id, name: r.name, designation: r.designation, score: r.score }));
                        exportToCSV(rows, 'md_message_completion.csv');
                      }} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium">Export CSV</button>
                    </div>

                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr className="text-left text-sm font-medium text-gray-700">
                          <th className="px-4 py-3">Employee ID</th>
                          <th className="px-4 py-3">Name</th>
                          <th className="px-4 py-3">Designation</th>
                          <th className="px-4 py-3">Score (task1)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        {mdRows.filter(r => (mdDeptFilter === 'All' || r.department === mdDeptFilter) && (mdDesigFilter === 'All' || r.designation === mdDesigFilter)).map(r => (
                          <tr key={r.id} className="hover:bg-gray-50">
                            <td className="px-4 py-3 text-sm">{r.employee_id}</td>
                            <td className="px-4 py-3 text-sm">{r.name}</td>
                            <td className="px-4 py-3 text-sm">{r.designation}</td>
                            <td className="px-4 py-3 text-sm font-medium">{r.score}</td>
                          </tr>
                        ))}
                        {mdRows.filter(r => (mdDeptFilter === 'All' || r.department === mdDeptFilter) && (mdDesigFilter === 'All' || r.designation === mdDesigFilter)).length === 0 && (
                          <tr>
                            <td colSpan={4} className="px-4 py-8 text-center text-gray-500">No MD Message completion data found for selected filters.</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>
            ) : selectedView === 'stats' && selectedAnalytics === 'none' ? (
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-800">{showBy === 'department' ? 'Department-wise Stats' : 'Designation-wise Stats'}</h3>
                  <div className="inline-flex border border-gray-300 rounded-lg overflow-hidden">
                    <button onClick={() => setShowBy('department')} className={`px-4 py-2 font-medium transition-colors ${showBy === 'department' ? 'bg-red-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}>Department</button>
                    <button onClick={() => setShowBy('designation')} className={`px-4 py-2 font-medium transition-colors ${showBy === 'designation' ? 'bg-red-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}>Designation</button>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 mb-6">
                  <div style={{ width: '100%', height: 500 }}>
                    {showBy === 'department' ? (
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={(departments as string[]).map(d => ({
                            category: d,
                            plan: PLAN_BY_DEPARTMENT[d] ?? 0,
                            actual: registrationsByDept.find(r => r.key === d)?.count ?? 0,
                          }))}
                          margin={{ top: 48, right: 30, left: 0, bottom: 60 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="category" tick={{ fontSize: 11 }} angle={-45} textAnchor="end" interval={0} height={80} />
                          <YAxis />
                          <Tooltip />
                          <Legend verticalAlign="top" align="right" />
                          <Bar dataKey="plan" fill="#2563EB" name="Plan" />
                          <Bar dataKey="actual" fill="#F59E0B" name="Actual" />
                        </BarChart>
                      </ResponsiveContainer>
                    ) : (
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={(designations as string[]).map(d => ({
                            category: d,
                            plan: PLAN_BY_DESIGNATION[d] ?? 0,
                            actual: registrationsByDesig.find(r => r.key === d)?.count ?? 0,
                          }))}
                          margin={{ top: 48, right: 30, left: 0, bottom: 60 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="category" tick={{ fontSize: 11 }} angle={-45} textAnchor="end" interval={0} height={80} />
                          <YAxis />
                          <Tooltip />
                          <Legend verticalAlign="top" align="right" />
                          <Bar dataKey="plan" fill="#2563EB" name="Plan" />
                          <Bar dataKey="actual" fill="#F59E0B" name="Actual" />
                        </BarChart>
                      </ResponsiveContainer>
                    )}
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-lg font-semibold text-gray-800">Registered Users</h4>
                    <div className="flex items-center gap-4">
                      <div className="text-sm font-medium text-gray-600">Total: {profiles.length}</div>
                      <div className="flex items-center gap-2">
                        <label className="text-sm font-medium text-gray-700">Department:</label>
                        <select value={departmentFilter} onChange={e => setDepartmentFilter(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent">
                          <option value="All">All</option>
                          {departments.map(d => <option key={d} value={d}>{d}</option>)}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <div className="flex items-center justify-end mb-2">
                      <button onClick={() => {
                        const rows = filteredProfiles.map(u => ({ user_id: u.user_id, name: u.name, department: u.department || 'Unknown', score: u.score }));
                        exportToCSV(rows, 'registered_users.csv');
                      }} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium">Export CSV</button>
                    </div>

                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr className="text-left text-sm font-medium text-gray-700">
                          <th className="px-4 py-3">User ID</th>
                          <th className="px-4 py-3">Name</th>
                          <th className="px-4 py-3">Department</th>
                          <th className="px-4 py-3">Score</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        {filteredProfiles.map(u => (
                          <tr key={u.id} className="hover:bg-gray-50">
                            <td className="px-4 py-3 text-sm">{u.user_id}</td>
                            <td className="px-4 py-3 text-sm">{u.name}</td>
                            <td className="px-4 py-3 text-sm">{u.department || 'Unknown'}</td>
                            <td className="px-4 py-3 text-sm font-medium">{typeof u.score === 'number' ? u.score : '-'}</td>
                          </tr>
                        ))}
                        {filteredProfiles.length === 0 && (
                          <tr>
                            <td colSpan={4} className="px-4 py-8 text-center text-gray-500">No users found for selected department.</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>
            ) : selectedView === 'registrations' && selectedAnalytics === 'none' ? (
              <section>
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
                  <p className="text-sm text-gray-600 mb-6">Live registration stats (updated in realtime).</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="p-6 border border-gray-200 rounded-lg bg-gradient-to-br from-blue-50 to-white">
                      <h4 className="text-sm font-medium text-gray-600 mb-2">Total Registered Users</h4>
                      <div className="text-4xl font-bold text-gray-900">{profiles.length}</div>
                    </div>

                    <div className="p-6 border border-gray-200 rounded-lg">
                      <h4 className="text-sm font-medium text-gray-600 mb-3">Departments</h4>
                      <div className="max-h-40 overflow-y-auto">
                        <ul className="space-y-1 text-sm text-gray-700">
                          {departments.map(d => <li key={d} className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>{d}</li>)}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">Recent Registrations</h4>
                    <div className="space-y-2">
                      {profiles.slice(0, 8).map(u => (
                        <div key={u.id} className="flex justify-between items-center border-b border-gray-200 pb-3">
                          <div>
                            <span className="font-medium text-gray-900">{u.name}</span>
                            <span className="text-sm text-gray-500 ml-2">({u.department || 'Unknown'})</span>
                          </div>
                          <span className="text-sm font-medium text-gray-700">Score: {u.score ?? '-'}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;