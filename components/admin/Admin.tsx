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
  const { currentUser, logout } = useContext(AppContext);
  const [profiles, setProfiles] = useState<ProfileRow[]>([]);
  const [selectedView, setSelectedView] = useState<'dashboard' | 'stats' | 'registrations'>('stats');
  const [selectedAnalytics, setSelectedAnalytics] = useState<'none' | 'videoCompletion' | 'mdMessage' | 'slogan'>('none');
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
  const [videoModuleFilter, setVideoModuleFilter] = useState<'All'|'m1'|'m2'|'m3'>('All');
  const [videoTaskFilter, setVideoTaskFilter] = useState<'All'|'task1'|'task2'|'task3'|'task4'|'task5'|'task6'>('All');
  const [mdRows, setMdRows] = useState<Array<any>>([]);
  const [mdDeptFilter, setMdDeptFilter] = useState<string>('All');
  const [mdDesigFilter, setMdDesigFilter] = useState<string>('All');
  // Slogan competition submissions
  const [sloganRows, setSloganRows] = useState<Array<any>>([]);
  const [sloganDeptFilter, setSloganDeptFilter] = useState<string>('All');
  const [sloganDesigFilter, setSloganDesigFilter] = useState<string>('All');

  // fetch slogans and join with profiles
  const fetchSlogans = async () => {
    const { data, error } = await supabaseClient
      .from('user_slogans')
      .select('id, user_id, slogan, created_at');
    if (error) {
      console.error('Error fetching user_slogans:', error.message || error);
      setSloganRows([]);
      return;
    }

    const rows = data || [];
    if (rows.length === 0) {
      setSloganRows([]);
      return;
    }

    const userIds = Array.from(new Set(rows.map((r: any) => r.user_id)));
    const { data: profilesData, error: profilesError } = await supabaseClient
      .from('profiles')
      .select('id, user_id, name, department, designation')
      .in('id', userIds as any[]);
    if (profilesError) {
      console.error('Error fetching profiles for slogans:', profilesError.message || profilesError);
    }

    const profileMap = new Map<string, any>();
    (profilesData || []).forEach((p: any) => profileMap.set(p.id, p));

    const joined = rows.map((r: any) => {
      const profile = profileMap.get(r.user_id) || null;
      return {
        id: r.id,
        user_id: r.user_id,
        employee_id: profile?.user_id || r.user_id,
        name: profile?.name || r.user_id,
        department: profile?.department || 'Unknown',
        designation: profile?.designation || 'Unknown',
        slogan: r.slogan || '',
        created_at: r.created_at || null,
      };
    });
    setSloganRows(joined);
  };

  const fetchVideoCompletions = async () => {
    // Prefer RPC: admin_video_completion which returns profiles joined with module progress and score.
    try {
      // pass module filter ('all'|'m1'|'m2'|'m3') so server can pre-filter
  const taskIndex = videoTaskFilter === 'All' ? null : Number(videoTaskFilter.replace('task',''));
  const { data, error } = await supabaseClient.rpc('admin_video_completion', { module_filter: videoModuleFilter.toLowerCase(), task_index: taskIndex });
      if (error) {
        console.error('admin_video_completion RPC error:', error.message || error);
        setVideoRows([]);
        return;
      }
      const rows = (data || []) as any[];
      // map RPC rows to client shape expected by the table
      const mapped = rows.map(r => ({
        id: r.id,
        user_id: r.user_id,
        employee_id: r.employee_id,
        name: r.name,
        department: r.department || 'Unknown',
        designation: r.designation || 'Unknown',
        score_m1: typeof r.score_m1 === 'number' ? r.score_m1 : (r.score_m1 ? Number(r.score_m1) : 0),
        score_m2: typeof r.score_m2 === 'number' ? r.score_m2 : (r.score_m2 ? Number(r.score_m2) : 0),
        score_m3: typeof r.score_m3 === 'number' ? r.score_m3 : (r.score_m3 ? Number(r.score_m3) : 0),
  total_score: typeof r.total_score === 'number' ? r.total_score : (r.total_score ? Number(r.total_score) : 0),
  task_score: typeof r.task_score === 'number' ? r.task_score : (r.task_score ? Number(r.task_score) : 0),
        m1Finished: !!r.m1,
        m2Finished: !!r.m2,
        m3Finished: !!r.m3,
        completed_at: r.completed_at || null,
      }));
      // Ensure each mapped row has a 'score' field for the table; default to total_score
      const withScore = mapped.map(r => ({
        ...r,
        // default score shown in table depends on selected module & task filter
        score: (videoTaskFilter === 'All') ? (r.total_score ?? 0) : (r.task_score ?? 0),
      }));
      setVideoRows(withScore);
    } catch (e) {
      console.error('Error calling admin_video_completion RPC', e);
      setVideoRows([]);
    }
  };

  // MD Message (task1) completions
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
    fetchSlogans();
    const ch = supabaseClient.channel('public:user_tasks')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'user_tasks' }, () => {
        fetchVideoCompletions();
        fetchMDCompletions();
      })
      .subscribe();

    const ch2 = supabaseClient.channel('public:user_slogans')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'user_slogans' }, () => {
        fetchSlogans();
      })
      .subscribe();

    return () => {
      supabaseClient.removeChannel(ch);
      supabaseClient.removeChannel(ch2);
    };
  }, [profiles]);

  // Re-fetch video completions whenever module filter changes so server-side filter applies
  useEffect(() => {
    fetchVideoCompletions();
  }, [videoModuleFilter]);

  // Re-fetch when task filter changes as well
  useEffect(() => {
    fetchVideoCompletions();
  }, [videoTaskFilter]);

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

  // Display lists sorted as requested (descending order highest -> lowest)
  const displayedProfiles = useMemo(() => {
    return filteredProfiles.slice().sort((a, b) => (b.score || 0) - (a.score || 0));
  }, [filteredProfiles]);

  const displayedVideoRows = useMemo(() => {
    const filtered = videoRows
      .filter(r => (videoDeptFilter === 'All' || r.department === videoDeptFilter) && (videoDesigFilter === 'All' || r.designation === videoDesigFilter))
      .filter(r => {
        // if a specific task is selected, rely on server-side filtering (RPC) and do not enforce full-module completion here
        if (videoTaskFilter !== 'All') {
          // ensure we only include rows returned by the RPC; accept rows even if module completion flags are false
          return r.task_score != null;
        }
        // default behavior: enforce module-level completion semantics
        if (videoModuleFilter === 'All') return r.m1Finished && r.m2Finished && r.m3Finished; // show only users who completed all modules when All is selected
        if (videoModuleFilter === 'm1') return r.m1Finished;
        if (videoModuleFilter === 'm2') return r.m2Finished;
        if (videoModuleFilter === 'm3') return r.m3Finished;
        return true;
      });

  // choose score key for sorting based on selected module or task
  const key = videoTaskFilter !== 'All' ? 'task_score' : (videoModuleFilter === 'm1' ? 'score_m1' : videoModuleFilter === 'm2' ? 'score_m2' : videoModuleFilter === 'm3' ? 'score_m3' : 'total_score');

    // assign a 'score' property used by the table and CSV so UI shows correct module score
    const withSelectedScore = filtered.map(r => ({
      ...r,
      score: (r[key] || 0),
    }));

    return withSelectedScore.slice().sort((a, b) => ((b[key] || 0) - (a[key] || 0)));
  }, [videoRows, videoDeptFilter, videoDesigFilter, videoModuleFilter, videoTaskFilter]);

  const displayedMdRows = useMemo(() => {
    return mdRows
      .filter(r => (mdDeptFilter === 'All' || r.department === mdDeptFilter) && (mdDesigFilter === 'All' || r.designation === mdDesigFilter))
      .slice()
      .sort((a, b) => (b.score || 0) - (a.score || 0));
  }, [mdRows, mdDeptFilter, mdDesigFilter]);

  const displayedSloganRows = useMemo(() => {
    return sloganRows
      .filter(r => (sloganDeptFilter === 'All' || r.department === sloganDeptFilter) && (sloganDesigFilter === 'All' || r.designation === sloganDesigFilter));
  }, [sloganRows, sloganDeptFilter, sloganDesigFilter]);

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
            onClick={async () => {
              setSelectedAnalytics('slogan');
              await fetchSlogans();
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
              selectedAnalytics === 'slogan' ? 'bg-red-500 text-white' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <FileText size={20} />
            <span className="font-medium">Slogan Competition Analytics</span>
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
            <span className="font-medium">Video Completion</span>
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
      {/* Logout button - bottom left */}
      <div className="fixed left-4 bottom-6 z-40">
        <button
          onClick={async () => {
            try {
              await logout();
            } catch (e) {
              console.error('Logout failed', e);
            }
          }}
          className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg shadow hover:bg-gray-900 transition-colors"
        >
          <X size={16} />
          <span className="text-sm font-medium">Logout</span>
        </button>
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
          {/* Page heading removed (individual sections render their own headings) */}
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-full mx-auto">
            {selectedView === 'dashboard' && selectedAnalytics === 'none' ? (
              <AdminDashboard />
            ) : selectedAnalytics === 'slogan' ? (
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-semibold">Slogan Competition Analytics</h3>
                </div>

                {/* Department-wise chart */}
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Department-wise Submissions</h3>
                  <div style={{ width: '100%', height: 500 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={(departments as string[]).map(d => ({
                          category: d,
                          plan: PLAN_BY_DEPARTMENT[d] ?? 0,
                          submitted: sloganRows.filter(s => s.department === d).length,
                        }))}
                        margin={{ top: 24, right: 30, left: 0, bottom: 60 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="category" tick={{ fontSize: 11 }} angle={-45} textAnchor="end" interval={0} height={80} />
                        <YAxis />
                        <Tooltip />
                        <Legend verticalAlign="top" align="right" />
                        <Bar dataKey="plan" fill="#2563EB" name="Planned" />
                        <Bar dataKey="submitted" fill="#F59E0B" name="Submitted" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Designation-wise chart */}
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Designation-wise Submissions</h3>
                  <div style={{ width: '100%', height: 500 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={(designations as string[]).map(d => ({
                          category: d,
                          plan: PLAN_BY_DESIGNATION[d] ?? 0,
                          submitted: sloganRows.filter(s => s.designation === d).length,
                        }))}
                        margin={{ top: 24, right: 30, left: 0, bottom: 60 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="category" tick={{ fontSize: 11 }} angle={-45} textAnchor="end" interval={0} height={100} />
                        <YAxis />
                        <Tooltip />
                        <Legend verticalAlign="top" align="right" />
                        <Bar dataKey="plan" fill="#2563EB" name="Planned" />
                        <Bar dataKey="submitted" fill="#F59E0B" name="Submitted" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <label className="text-sm font-medium text-gray-700">Department:</label>
                      <select value={sloganDeptFilter} onChange={e => setSloganDeptFilter(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent">
                        <option value="All">All</option>
                        {departments.map(d => <option key={d} value={d}>{d}</option>)}
                      </select>
                    </div>

                    <div className="flex items-center gap-2">
                      <label className="text-sm font-medium text-gray-700">Designation:</label>
                      <select value={sloganDesigFilter} onChange={e => setSloganDesigFilter(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent">
                        <option value="All">All</option>
                        {designations.map(d => <option key={d} value={d}>{d}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <div className="flex items-center justify-end mb-2">
                      <button onClick={() => {
                        const rows = displayedSloganRows.map(r => ({ employee_id: r.employee_id, name: r.name, slogan: r.slogan }));
                        exportToCSV(rows, 'slogan_submissions.csv');
                      }} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium">Export CSV</button>
                    </div>

                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr className="text-left text-sm font-medium text-gray-700">
                          <th className="px-4 py-3">Employee ID</th>
                          <th className="px-4 py-3">Name</th>
                          <th className="px-4 py-3">Slogan Submitted</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        {displayedSloganRows.map(r => (
                          <tr key={r.id} className="hover:bg-gray-50">
                            <td className="px-4 py-3 text-sm">{r.employee_id}</td>
                            <td className="px-4 py-3 text-sm">{r.name}</td>
                            <td className="px-4 py-3 text-sm">{r.slogan}</td>
                          </tr>
                        ))}
                        {displayedSloganRows.length === 0 && (
                          <tr>
                            <td colSpan={3} className="px-4 py-8 text-center text-gray-500">No slogan submissions found for selected filters.</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>
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
                    <div className="flex items-center gap-2">
                      <label className="text-sm font-medium text-gray-700">Module:</label>
                      <select value={videoModuleFilter} onChange={e => setVideoModuleFilter(e.target.value as any)} className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent">
                        <option value="All">All</option>
                        <option value="m1">m1</option>
                        <option value="m2">m2</option>
                        <option value="m3">m3</option>
                      </select>
                    </div>
                    <div className="flex items-center gap-2">
                      <label className="text-sm font-medium text-gray-700">Task:</label>
                      <select value={videoTaskFilter} onChange={e => setVideoTaskFilter(e.target.value as any)} className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent">
                        <option value="All">All Tasks</option>
                        <option value="task1">task1</option>
                        <option value="task2">task2</option>
                        <option value="task3">task3</option>
                        <option value="task4">task4</option>
                        <option value="task5">task5</option>
                        <option value="task6">task6</option>
                      </select>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                      <div className="flex items-center justify-end mb-2">
                        <button onClick={() => {
                        const rows = displayedVideoRows.map(r => ({ employee_id: r.employee_id, name: r.name, department: r.department, designation: r.designation, score_m1: r.score_m1, score_m2: r.score_m2, score_m3: r.score_m3, total_score: r.total_score, task_score: r.task_score, m1: r.m1Finished, m2: r.m2Finished, m3: r.m3Finished }));
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
                          <th className="px-4 py-3">Score</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        {displayedVideoRows.map(r => (
                          <tr key={r.id} className="hover:bg-gray-50">
                            <td className="px-4 py-3 text-sm">{r.employee_id}</td>
                            <td className="px-4 py-3 text-sm">{r.name}</td>
                            <td className="px-4 py-3 text-sm">{r.department}</td>
                            <td className="px-4 py-3 text-sm">{r.designation}</td>
                            <td className="px-4 py-3 text-sm font-medium">{r.score}</td>
                          </tr>
                        ))}
                        {displayedVideoRows.length === 0 && (
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
                          plan: PLAN_BY_DEPARTMENT[d] ?? 0,
                          completed: mdRows.filter(m => m.department === d && m.finished).length,
                        }))}
                        margin={{ top: 24, right: 30, left: 0, bottom: 60 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="category" tick={{ fontSize: 11 }} angle={-45} textAnchor="end" interval={0} height={80} />
                        <YAxis />
                        <Tooltip />
                        <Legend verticalAlign="top" align="right" />
                        <Bar dataKey="plan" fill="#2563EB" name="Planned" />
                        <Bar dataKey="completed" fill="#10B981" name="Completed" />
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
                          plan: PLAN_BY_DESIGNATION[d] ?? 0,
                          completed: mdRows.filter(m => m.designation === d && m.finished).length,
                        }))}
                        margin={{ top: 24, right: 30, left: 0, bottom: 80 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="category" tick={{ fontSize: 11 }} angle={-45} textAnchor="end" interval={0} height={100} />
                        <YAxis />
                        <Tooltip />
                        <Legend verticalAlign="top" align="right" />
                        <Bar dataKey="plan" fill="#2563EB" name="Planned" />
                        <Bar dataKey="completed" fill="#10B981" name="Completed" />
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
                        const rows = displayedMdRows.map(r => ({ employee_id: r.employee_id, name: r.name, designation: r.designation, score: r.score }));
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
                        {displayedMdRows.map(r => (
                          <tr key={r.id} className="hover:bg-gray-50">
                            <td className="px-4 py-3 text-sm">{r.employee_id}</td>
                            <td className="px-4 py-3 text-sm">{r.name}</td>
                            <td className="px-4 py-3 text-sm">{r.designation}</td>
                            <td className="px-4 py-3 text-sm font-medium">{r.score}</td>
                          </tr>
                        ))}
                        {displayedMdRows.length === 0 && (
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
                        const rows = displayedProfiles.map(u => ({ user_id: u.user_id, name: u.name, department: u.department || 'Unknown', score: u.score }));
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
                        {displayedProfiles.map(u => (
                          <tr key={u.id} className="hover:bg-gray-50">
                            <td className="px-4 py-3 text-sm">{u.user_id}</td>
                            <td className="px-4 py-3 text-sm">{u.name}</td>
                            <td className="px-4 py-3 text-sm">{u.department || 'Unknown'}</td>
                            <td className="px-4 py-3 text-sm font-medium">{typeof u.score === 'number' ? u.score : '-'}</td>
                          </tr>
                        ))}
                        {displayedProfiles.length === 0 && (
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
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">Top Performers (by Score)</h4>
                    <div className="space-y-2">
                      {profiles.slice().sort((a, b) => (b.score || 0) - (a.score || 0)).slice(0, 8).map(u => (
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