import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Save,
  Plus,
  Trash2,
  Edit3,
  Database,
  FileText,
  Check,
  Sparkles,
  Lock,
  LogOut,
  UserCheck,
  ShieldAlert,
  Key,
  Search,
  Layout,
  Globe,
  Sliders,
  CheckCircle,
  ExternalLink,
  RefreshCw
} from 'lucide-react';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { auth, updateCustomFirebaseApiKey, firebaseConfig } from '../../lib/firebase';
import { useSiteContent } from '../../context/SiteContentContext';
import { useTheme } from '../../context/ThemeContext';
import {
  subscribeProjects,
  addFirebaseProject,
  updateFirebaseProject,
  deleteFirebaseProject,
  uploadProjectImage
} from '../../services/projectService';
import { RealProject } from '../../types';

const AUTHORIZED_ADMIN_EMAILS = [
  'mhamedwalid@gmail.com',
  'youssefosama@gmail.com'
];

export const AdminCmsModal: React.FC = () => {
  const { isAdminOpen, setAdminOpen, content, saveAllContent } = useSiteContent();
  const { theme } = useTheme();

  // Auth State
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [customApiKey, setCustomApiKey] = useState('');
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // CMS State & Search / Section Filters
  const [activeTab, setActiveTab] = useState<'content' | 'projects' | 'config'>('content');
  const [sectionFilter, setSectionFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [localContent, setLocalContent] = useState<Record<string, string>>({});
  const [isSavingContent, setIsSavingContent] = useState(false);
  const [contentSaveSuccess, setContentSaveSuccess] = useState(false);

  // Projects State
  const [projects, setProjects] = useState<RealProject[]>([]);
  const [editingProject, setEditingProject] = useState<Partial<RealProject> | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [isSavingProject, setIsSavingProject] = useState(false);

  // Auth State Subscription
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    if (isAdminOpen) {
      setLocalContent({ ...content });
    }
  }, [isAdminOpen, content]);

  useEffect(() => {
    if (!isAdminOpen) return;
    const unsub = subscribeProjects((fetched) => {
      setProjects(fetched);
    });
    return () => unsub();
  }, [isAdminOpen]);

  if (!isAdminOpen) return null;

  const isAuthorizedAdmin =
    currentUser &&
    currentUser.email &&
    (AUTHORIZED_ADMIN_EMAILS.includes(currentUser.email.toLowerCase()) ||
      AUTHORIZED_ADMIN_EMAILS.some((e) => e.toLowerCase() === currentUser.email?.toLowerCase()));

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setIsLoggingIn(true);

    try {
      await signInWithEmailAndPassword(auth, loginEmail.trim(), loginPassword);
      setLoginEmail('');
      setLoginPassword('');
    } catch (err: any) {
      const msg = err.message || '';
      if (msg.includes('API key') || msg.includes('400') || msg.includes('invalid-api-key')) {
        setShowApiKeyInput(true);
        setAuthError(
          '⚠️ Firebase API Key Missing: Click "Configure API Key" below and paste your real Firebase API Key from Firebase Console.'
        );
      } else if (
        msg.includes('auth/invalid-credential') ||
        msg.includes('auth/user-not-found') ||
        msg.includes('auth/wrong-password')
      ) {
        setAuthError('Incorrect email or password. Please check your credentials in Firebase Auth.');
      } else {
        setAuthError(msg || 'Failed to sign in. Please verify your credentials.');
      }
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleSaveApiKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customApiKey.trim()) return;
    updateCustomFirebaseApiKey(customApiKey.trim());
  };

  const handleSignOut = async () => {
    await signOut(auth);
  };

  const handleContentChange = (key: string, value: string) => {
    setLocalContent((prev) => ({ ...prev, [key]: value }));
  };

  const handleSaveAllContent = async () => {
    setIsSavingContent(true);
    try {
      await saveAllContent(localContent);
      setContentSaveSuccess(true);
      setTimeout(() => setContentSaveSuccess(false), 2500);
    } catch (err) {
      alert('Error saving site content to Firebase: ' + (err as Error).message);
    } finally {
      setIsSavingContent(false);
    }
  };

  const handleCreateNewProject = () => {
    setEditingProject({
      title: '',
      subtitle: '',
      category: 'E-Commerce / Retail Store',
      description: '',
      imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1400&auto=format&fit=crop',
      liveUrl: 'https://example.com',
      techStack: ['React', 'Tailwind CSS', 'Vercel'],
      year: '2026',
      featured: true
    });
    setImageFile(null);
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject || !editingProject.title) return;

    setIsSavingProject(true);
    try {
      let finalImageUrl = editingProject.imageUrl || '';

      if (imageFile) {
        setUploadingImage(true);
        finalImageUrl = await uploadProjectImage(imageFile);
        setUploadingImage(false);
      }

      const projectData = {
        title: editingProject.title || 'Untitled Project',
        subtitle: editingProject.subtitle || 'Custom Solution',
        category: editingProject.category || 'General',
        description: editingProject.description || '',
        imageUrl: finalImageUrl,
        liveUrl: editingProject.liveUrl || '',
        techStack:
          typeof editingProject.techStack === 'string'
            ? (editingProject.techStack as string).split(',').map((s) => s.trim())
            : editingProject.techStack || ['React'],
        year: editingProject.year || '2026',
        featured: editingProject.featured ?? true
      };

      if (editingProject.id) {
        await updateFirebaseProject(editingProject.id, projectData);
      } else {
        await addFirebaseProject(projectData);
      }

      setEditingProject(null);
      setImageFile(null);
    } catch (err) {
      alert('Error saving project to Firebase: ' + (err as Error).message);
    } finally {
      setIsSavingProject(false);
      setUploadingImage(false);
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (confirm('Are you sure you want to delete this project from Firebase?')) {
      try {
        await deleteFirebaseProject(id);
      } catch (err) {
        alert('Error deleting project: ' + (err as Error).message);
      }
    }
  };

  // Filtered Content Keys
  const filteredContentKeys = Object.keys(localContent).filter((key) => {
    const matchesSearch =
      key.toLowerCase().includes(searchQuery.toLowerCase()) ||
      localContent[key]?.toLowerCase().includes(searchQuery.toLowerCase());
    if (sectionFilter === 'all') return matchesSearch;
    return matchesSearch && key.startsWith(sectionFilter);
  });

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 md:p-8 bg-black/85 backdrop-blur-xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 10 }}
          className="w-full max-w-6xl h-[88vh] rounded-3xl border border-zinc-800 bg-[#07070a]/95 text-white shadow-[0_20px_60px_rgba(0,0,0,0.9)] flex flex-col overflow-hidden font-mono"
        >
          {/* Top Cybernetic Status Bar */}
          <div className="px-6 py-4 border-b border-zinc-800/80 bg-[#0c0c12]/80 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500/20 via-cyan-500/20 to-indigo-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-lg">
                <Sparkles className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm sm:text-base font-black tracking-widest uppercase font-sans">
                    NEXT GEN DEVS // CMS PORTAL
                  </h3>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold uppercase">
                    v3.0 LIVE
                  </span>
                </div>
                <p className="text-[11px] text-zinc-400 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  {currentUser ? `Admin: ${currentUser.email}` : 'Firebase Authentication System'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {currentUser && (
                <button
                  onClick={handleSignOut}
                  className="px-4 py-2 rounded-full border border-rose-500/30 bg-rose-500/10 text-rose-400 text-xs font-bold uppercase flex items-center gap-1.5 hover:bg-rose-500 hover:text-white transition-all cursor-pointer shadow-md"
                >
                  <LogOut className="w-3.5 h-3.5" /> Sign Out
                </button>
              )}
              <button
                onClick={() => setAdminOpen(false)}
                className="p-2.5 rounded-full bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-zinc-300 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Authentication Screen */}
          {!currentUser || !isAuthorizedAdmin ? (
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-6 overflow-y-auto">
              {currentUser && !isAuthorizedAdmin ? (
                /* Unauthorized Email View */
                <div className="max-w-md p-8 rounded-3xl border border-rose-500/30 bg-rose-500/10 space-y-4 text-center">
                  <ShieldAlert className="w-12 h-12 text-rose-400 mx-auto" />
                  <h4 className="text-lg font-bold text-white uppercase font-sans">ACCESS RESTRICTED</h4>
                  <p className="text-xs text-rose-200 leading-relaxed font-sans">
                    Logged in as <strong className="text-white">{currentUser.email}</strong>. This email is not on the admin authorization whitelist.
                  </p>
                  <div className="text-[11px] text-zinc-400 bg-black/60 p-3 rounded-2xl border border-zinc-800 text-left font-mono space-y-1">
                    <p className="text-emerald-400 font-bold">Authorized Admins:</p>
                    <p>• mhamedwalid@gmail.com</p>
                    <p>• youssefosama@gmail.com</p>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="px-6 py-3 rounded-full bg-rose-500 hover:bg-rose-400 text-white font-bold text-xs uppercase cursor-pointer transition-all shadow-lg"
                  >
                    Switch Account / Logout
                  </button>
                </div>
              ) : (
                /* Futuristic Admin Login Form */
                <div className="w-full max-w-md space-y-4">
                  <form
                    onSubmit={handleLogin}
                    className="p-8 rounded-3xl border border-zinc-800 bg-[#0c0c14]/90 space-y-5 text-left shadow-2xl backdrop-blur-xl relative overflow-hidden"
                  >
                    <div className="flex items-center gap-3 border-b border-zinc-800/80 pb-4">
                      <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                        <Lock className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white uppercase tracking-wider font-sans">
                          ADMIN PORTAL LOGIN
                        </h4>
                        <p className="text-[11px] text-zinc-400 font-sans">Firebase Secure CMS Access</p>
                      </div>
                    </div>

                    {authError && (
                      <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-sans leading-relaxed">
                        {authError}
                      </div>
                    )}

                    <div className="space-y-4 text-xs font-mono">
                      <div>
                        <label className="block text-zinc-400 mb-1.5 uppercase tracking-wider">Admin Email</label>
                        <input
                          type="email"
                          required
                          value={loginEmail}
                          onChange={(e) => setLoginEmail(e.target.value)}
                          placeholder="mhamedwalid@gmail.com or youssefosama@gmail.com"
                          className="w-full bg-[#13131c] border border-zinc-800 p-3 rounded-xl text-white focus:border-emerald-500 focus:outline-none transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-zinc-400 mb-1.5 uppercase tracking-wider">Password</label>
                        <input
                          type="password"
                          required
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full bg-[#13131c] border border-zinc-800 p-3 rounded-xl text-white focus:border-emerald-500 focus:outline-none transition-colors"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isLoggingIn}
                        className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-black font-black text-xs tracking-widest uppercase flex items-center justify-center gap-2 shadow-xl transition-all cursor-pointer"
                      >
                        <UserCheck className="w-4 h-4" />
                        {isLoggingIn ? 'Authenticating...' : 'Sign In as Admin'}
                      </button>
                    </div>

                    <div className="pt-2 flex items-center justify-between text-[10px] text-zinc-500 font-mono border-t border-zinc-800/80">
                      <span>Admins: mhamedwalid / youssefosama</span>
                      <button
                        type="button"
                        onClick={() => setShowApiKeyInput(!showApiKeyInput)}
                        className="text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer font-bold"
                      >
                        <Key className="w-3 h-3" /> Config API Key
                      </button>
                    </div>
                  </form>

                  {/* Config Firebase API Key Dropdown Form */}
                  {showApiKeyInput && (
                    <form
                      onSubmit={handleSaveApiKey}
                      className="p-6 rounded-3xl border border-amber-500/30 bg-[#161410] space-y-3 text-left shadow-xl"
                    >
                      <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
                        <Key className="w-4 h-4" />
                        <span>Paste Firebase API Key (From Firebase Console)</span>
                      </div>
                      <p className="text-[11px] text-zinc-400 font-sans leading-relaxed">
                        If Vercel environment variables are not configured yet, paste your real Firebase API Key below:
                      </p>
                      <input
                        type="text"
                        required
                        value={customApiKey}
                        onChange={(e) => setCustomApiKey(e.target.value)}
                        placeholder="AIzaSy..."
                        className="w-full bg-[#1c1a16] border border-amber-500/40 p-3 rounded-xl text-xs font-mono text-white focus:outline-none"
                      />
                      <button
                        type="submit"
                        className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase cursor-pointer shadow-md"
                      >
                        Save API Key & Reload
                      </button>
                    </form>
                  )}
                </div>
              )}
            </div>
          ) : (
            /* Authorized Luxury Admin Portal Layout */
            <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
              {/* Sidebar Navigation */}
              <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-zinc-800/80 bg-[#09090e] p-4 flex flex-col justify-between gap-4">
                <div className="space-y-4">
                  <div className="px-3 py-2 text-[10px] font-mono tracking-widest text-zinc-500 uppercase font-bold">
                    // NAVIGATION MENU
                  </div>

                  <div className="space-y-1">
                    <button
                      onClick={() => setActiveTab('content')}
                      className={`w-full px-4 py-3 rounded-2xl text-xs font-bold tracking-wider uppercase flex items-center justify-between transition-all cursor-pointer ${
                        activeTab === 'content'
                          ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
                          : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="w-4 h-4" />
                        <span>Site Texts</span>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-zinc-800 text-[10px]">
                        {Object.keys(localContent).length}
                      </span>
                    </button>

                    <button
                      onClick={() => setActiveTab('projects')}
                      className={`w-full px-4 py-3 rounded-2xl text-xs font-bold tracking-wider uppercase flex items-center justify-between transition-all cursor-pointer ${
                        activeTab === 'projects'
                          ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
                          : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Database className="w-4 h-4" />
                        <span>Projects DB</span>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-zinc-800 text-[10px]">{projects.length}</span>
                    </button>

                    <button
                      onClick={() => setActiveTab('config')}
                      className={`w-full px-4 py-3 rounded-2xl text-xs font-bold tracking-wider uppercase flex items-center gap-3 transition-all cursor-pointer ${
                        activeTab === 'config'
                          ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
                          : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
                      }`}
                    >
                      <Key className="w-4 h-4" />
                      <span>Firebase Settings</span>
                    </button>
                  </div>
                </div>

                {/* Sidebar Footer Info */}
                <div className="p-4 rounded-2xl border border-zinc-800/80 bg-[#0f0f16] space-y-2 text-[10px] text-zinc-400">
                  <div className="flex items-center justify-between">
                    <span>STATUS</span>
                    <span className="text-emerald-400 font-bold">● ONLINE</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>STORAGE</span>
                    <span className="text-zinc-300">FIREBASE</span>
                  </div>
                </div>
              </div>

              {/* Main CMS Work Area */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-[#060609]">
                {/* TAB 1: WEBSITE TEXTS EDITOR */}
                {activeTab === 'content' && (
                  <div className="space-y-6">
                    {/* Header Bar with Action & Filter Controls */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl border border-zinc-800 bg-[#0c0c14]">
                      <div className="flex items-center gap-3 flex-1">
                        <Search className="w-4 h-4 text-zinc-400" />
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Search text keys or values..."
                          className="bg-transparent border-none text-xs text-white placeholder-zinc-500 focus:outline-none w-full"
                        />
                      </div>

                      <div className="flex items-center gap-2">
                        <select
                          value={sectionFilter}
                          onChange={(e) => setSectionFilter(e.target.value)}
                          className="bg-[#14141f] border border-zinc-700 text-xs font-mono text-zinc-300 rounded-xl px-3 py-2 focus:outline-none"
                        >
                          <option value="all">All Sections</option>
                          <option value="hero">Hero Section</option>
                          <option value="statement">Brand Philosophy</option>
                          <option value="srv">Services</option>
                          <option value="work">Work & Portfolio</option>
                          <option value="about">About</option>
                          <option value="contact">Contact</option>
                          <option value="footer">Footer</option>
                        </select>

                        <button
                          onClick={handleSaveAllContent}
                          disabled={isSavingContent}
                          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-black font-black text-xs tracking-wider uppercase flex items-center gap-2 cursor-pointer shadow-lg transition-all"
                        >
                          {contentSaveSuccess ? (
                            <>
                              <Check className="w-4 h-4" /> Saved!
                            </>
                          ) : (
                            <>
                              <Save className="w-4 h-4" /> {isSavingContent ? 'Saving...' : 'Save All'}
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Text Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {filteredContentKeys.map((key) => (
                        <div
                          key={key}
                          className="p-4 rounded-2xl border border-zinc-800/80 bg-[#0d0d14] space-y-2 hover:border-zinc-700 transition-colors"
                        >
                          <div className="flex items-center justify-between text-[10px] font-mono tracking-widest uppercase text-emerald-400 font-bold">
                            <span>{key}</span>
                            <span className="text-zinc-600">FIREBASE</span>
                          </div>

                          {localContent[key]?.length > 60 ? (
                            <textarea
                              rows={3}
                              value={localContent[key]}
                              onChange={(e) => handleContentChange(key, e.target.value)}
                              className="w-full bg-[#14141e] border border-zinc-800 rounded-xl p-3 text-xs text-zinc-100 focus:border-emerald-500 focus:outline-none transition-colors"
                            />
                          ) : (
                            <input
                              type="text"
                              value={localContent[key]}
                              onChange={(e) => handleContentChange(key, e.target.value)}
                              className="w-full bg-[#14141e] border border-zinc-800 rounded-xl p-3 text-xs text-zinc-100 focus:border-emerald-500 focus:outline-none transition-colors"
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* TAB 2: PROJECTS DATABASE */}
                {activeTab === 'projects' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-bold tracking-wider uppercase text-zinc-200">
                          Firebase Portfolio Projects
                        </h4>
                        <p className="text-xs text-zinc-500">Add, edit, or delete live projects displayed on the site</p>
                      </div>
                      <button
                        onClick={handleCreateNewProject}
                        className="px-5 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs tracking-wider uppercase flex items-center gap-2 cursor-pointer transition-all shadow-lg"
                      >
                        <Plus className="w-4 h-4" /> Add New Project
                      </button>
                    </div>

                    {/* Edit / Add Modal Form */}
                    {editingProject && (
                      <form
                        onSubmit={handleSaveProject}
                        className="p-6 rounded-3xl border border-emerald-500/40 bg-[#0d0d15] space-y-4 shadow-2xl"
                      >
                        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                          <h5 className="text-xs font-bold text-emerald-400 tracking-wider uppercase">
                            {editingProject.id ? 'Edit Project' : 'Create New Project'}
                          </h5>
                          <button
                            type="button"
                            onClick={() => setEditingProject(null)}
                            className="text-zinc-500 hover:text-white text-xs"
                          >
                            Close
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                          <div>
                            <label className="block text-zinc-400 mb-1">Project Title</label>
                            <input
                              type="text"
                              required
                              value={editingProject.title || ''}
                              onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                              className="w-full bg-[#151520] border border-zinc-800 p-3 rounded-xl text-white focus:border-emerald-500 focus:outline-none"
                              placeholder="e.g. NXT Brand"
                            />
                          </div>

                          <div>
                            <label className="block text-zinc-400 mb-1">Subtitle / Tagline</label>
                            <input
                              type="text"
                              value={editingProject.subtitle || ''}
                              onChange={(e) => setEditingProject({ ...editingProject, subtitle: e.target.value })}
                              className="w-full bg-[#151520] border border-zinc-800 p-3 rounded-xl text-white focus:border-emerald-500 focus:outline-none"
                              placeholder="e.g. Fashion & Luxury E-Commerce"
                            />
                          </div>

                          <div>
                            <label className="block text-zinc-400 mb-1">Category</label>
                            <input
                              type="text"
                              value={editingProject.category || ''}
                              onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                              className="w-full bg-[#151520] border border-zinc-800 p-3 rounded-xl text-white focus:border-emerald-500 focus:outline-none"
                              placeholder="e.g. E-Commerce"
                            />
                          </div>

                          <div>
                            <label className="block text-zinc-400 mb-1">Live URL</label>
                            <input
                              type="url"
                              value={editingProject.liveUrl || ''}
                              onChange={(e) => setEditingProject({ ...editingProject, liveUrl: e.target.value })}
                              className="w-full bg-[#151520] border border-zinc-800 p-3 rounded-xl text-white focus:border-emerald-500 focus:outline-none"
                              placeholder="https://..."
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-zinc-400 mb-1 text-xs">Description</label>
                          <textarea
                            rows={3}
                            value={editingProject.description || ''}
                            onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                            className="w-full bg-[#151520] border border-zinc-800 p-3 rounded-xl text-xs text-white focus:border-emerald-500 focus:outline-none"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                          <div>
                            <label className="block text-zinc-400 mb-1">Upload Project Image File</label>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                              className="w-full bg-[#151520] border border-zinc-800 p-2.5 rounded-xl text-zinc-300 text-xs"
                            />
                          </div>

                          <div>
                            <label className="block text-zinc-400 mb-1">Or Direct Image URL</label>
                            <input
                              type="text"
                              value={editingProject.imageUrl || ''}
                              onChange={(e) => setEditingProject({ ...editingProject, imageUrl: e.target.value })}
                              className="w-full bg-[#151520] border border-zinc-800 p-3 rounded-xl text-white focus:border-emerald-500 focus:outline-none"
                              placeholder="https://..."
                            />
                          </div>
                        </div>

                        <div className="flex items-center justify-end gap-3 pt-2">
                          <button
                            type="button"
                            onClick={() => setEditingProject(null)}
                            className="px-5 py-2.5 rounded-full border border-zinc-700 text-zinc-400 text-xs hover:bg-zinc-800 cursor-pointer"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            disabled={isSavingProject || uploadingImage}
                            className="px-6 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs uppercase flex items-center gap-2 cursor-pointer shadow-lg"
                          >
                            <Save className="w-4 h-4" />
                            {isSavingProject ? 'Saving to Firebase...' : 'Save Project'}
                          </button>
                        </div>
                      </form>
                    )}

                    {/* Projects Grid List */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {projects.map((proj) => (
                        <div
                          key={proj.id}
                          className="p-4 rounded-2xl border border-zinc-800 bg-[#0d0d14] flex gap-4 items-center hover:border-zinc-700 transition-colors"
                        >
                          <img
                            src={proj.imageUrl}
                            alt={proj.title}
                            className="w-20 h-20 object-cover rounded-xl border border-zinc-800"
                          />
                          <div className="flex-1 min-w-0">
                            <h5 className="text-sm font-bold text-white truncate">{proj.title}</h5>
                            <p className="text-xs text-emerald-400 truncate">{proj.category}</p>
                            <a
                              href={proj.liveUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-[11px] text-zinc-400 underline truncate block mt-0.5"
                            >
                              {proj.liveUrl}
                            </a>
                          </div>
                          <div className="flex flex-col gap-2">
                            <button
                              onClick={() => setEditingProject(proj)}
                              className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white cursor-pointer transition-colors"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteProject(proj.id)}
                              className="p-2 rounded-lg bg-rose-500/20 hover:bg-rose-500/40 text-rose-400 cursor-pointer transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}

                      {projects.length === 0 && (
                        <div className="col-span-full p-12 text-center text-zinc-500 text-xs border border-dashed border-zinc-800 rounded-3xl space-y-2">
                          <p>No projects currently in Firebase.</p>
                          <p className="text-emerald-400 font-bold">Click "Add New Project" to add one!</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* TAB 3: FIREBASE CONFIG SETTINGS */}
                {activeTab === 'config' && (
                  <div className="space-y-6 max-w-2xl">
                    <div className="p-6 rounded-3xl border border-zinc-800 bg-[#0d0d14] space-y-4">
                      <div className="flex items-center gap-3 border-b border-zinc-800 pb-3">
                        <Key className="w-5 h-5 text-emerald-400" />
                        <h4 className="text-sm font-bold text-white uppercase font-sans">
                          Firebase Credentials Info
                        </h4>
                      </div>

                      <div className="space-y-2 text-xs font-mono text-zinc-300">
                        <p>
                          <strong className="text-zinc-500">PROJECT ID:</strong> {firebaseConfig.projectId}
                        </p>
                        <p>
                          <strong className="text-zinc-500">AUTH DOMAIN:</strong> {firebaseConfig.authDomain}
                        </p>
                        <p>
                          <strong className="text-zinc-500">STORAGE BUCKET:</strong> {firebaseConfig.storageBucket}
                        </p>
                        <p>
                          <strong className="text-zinc-500">API KEY:</strong>{' '}
                          {firebaseConfig.apiKey.slice(0, 10)}...
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
