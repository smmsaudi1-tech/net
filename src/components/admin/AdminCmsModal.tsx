import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, Plus, Trash2, Edit3, Upload, Image as ImageIcon, Database, FileText, Check, Sparkles, Lock, LogOut, UserCheck, ShieldAlert, Key } from 'lucide-react';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { useSiteContent } from '../../context/SiteContentContext';
import { useTheme } from '../../context/ThemeContext';
import { subscribeProjects, addFirebaseProject, updateFirebaseProject, deleteFirebaseProject, uploadProjectImage } from '../../services/projectService';
import { RealProject } from '../../types';

// Authorized Admin Email List
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
  const [authError, setAuthError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Tabs & CMS State
  const [activeTab, setActiveTab] = useState<'content' | 'projects'>('content');
  const [localContent, setLocalContent] = useState<Record<string, string>>({});
  const [isSavingContent, setIsSavingContent] = useState(false);
  const [contentSaveSuccess, setContentSaveSuccess] = useState(false);

  // Projects state
  const [projects, setProjects] = useState<RealProject[]>([]);
  const [editingProject, setEditingProject] = useState<Partial<RealProject> | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [isSavingProject, setIsSavingProject] = useState(false);

  // Listen to Firebase Auth state
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

  const isAuthorizedAdmin = currentUser && currentUser.email && (
    AUTHORIZED_ADMIN_EMAILS.includes(currentUser.email.toLowerCase()) ||
    AUTHORIZED_ADMIN_EMAILS.some(e => e.toLowerCase() === currentUser.email?.toLowerCase())
  );

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
        setAuthError(
          '💡 Vercel / Firebase Key Alert: Please add your real VITE_FIREBASE_API_KEY environment variable in Vercel settings or project .env file.'
        );
      } else if (msg.includes('auth/invalid-credential') || msg.includes('auth/user-not-found') || msg.includes('auth/wrong-password')) {
        setAuthError('Incorrect email or password. Please verify your Firebase Authentication credentials.');
      } else {
        setAuthError(msg || 'Failed to sign in. Please verify your credentials.');
      }
    } finally {
      setIsLoggingIn(false);
    }
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
      category: 'E-Commerce / Custom Brand',
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
        techStack: typeof editingProject.techStack === 'string'
          ? (editingProject.techStack as string).split(',').map(s => s.trim())
          : (editingProject.techStack || ['React']),
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

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className={`w-full max-w-5xl h-[85vh] rounded-3xl border shadow-2xl flex flex-col overflow-hidden font-mono ${
            theme === 'dark' ? 'bg-[#0a0a0a] border-[#262626] text-[#ffffff]' : 'bg-[#ffffff] border-[#e5e5e5] text-[#000000]'
          }`}
        >
          {/* Header Bar */}
          <div className="px-6 py-4 border-b border-[#262626] flex items-center justify-between bg-[#111111]/40">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-black tracking-wider uppercase">FIREBASE ADMIN CMS & PROJECT MANAGER</h3>
                <p className="text-[11px] text-zinc-400">
                  {currentUser ? `Logged in as: ${currentUser.email}` : 'Firebase Authentication Protected'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {currentUser && (
                <button
                  onClick={handleSignOut}
                  className="px-3 py-1.5 rounded-full border border-rose-500/30 bg-rose-500/10 text-rose-400 text-xs font-bold uppercase flex items-center gap-1.5 hover:bg-rose-500 hover:text-white transition-all cursor-pointer"
                  title="Sign Out of Admin Session"
                >
                  <LogOut className="w-3.5 h-3.5" /> Sign Out
                </button>
              )}

              <button
                onClick={() => setAdminOpen(false)}
                className="p-2 rounded-full hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Authentication Guard View */}
          {(!currentUser || !isAuthorizedAdmin) ? (
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-6 overflow-y-auto">
              {currentUser && !isAuthorizedAdmin ? (
                /* User logged in but email is not authorized */
                <div className="max-w-md p-8 rounded-3xl border border-rose-500/30 bg-rose-500/10 space-y-4 text-center">
                  <ShieldAlert className="w-12 h-12 text-rose-400 mx-auto" />
                  <h4 className="text-lg font-bold text-white uppercase font-sans">ACCESS DENIED</h4>
                  <p className="text-xs text-rose-200 leading-relaxed font-sans">
                    The email <strong className="text-white">{currentUser.email}</strong> is not authorized to edit website data.
                  </p>
                  <div className="text-[11px] text-zinc-400 bg-black/40 p-3 rounded-xl">
                    Authorized Admins:
                    <br />
                    <span className="text-emerald-400">mhamedwalid@gmail.com</span>
                    <br />
                    <span className="text-emerald-400">youssefosama@gmail.com</span>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="px-5 py-2.5 rounded-full bg-rose-500 text-white font-bold text-xs uppercase cursor-pointer"
                  >
                    Switch Account / Sign Out
                  </button>
                </div>
              ) : (
                /* Login Form */
                <form onSubmit={handleLogin} className="w-full max-w-md p-8 rounded-3xl border border-[#262626] bg-[#121216] space-y-5 text-left shadow-2xl">
                  <div className="flex items-center gap-3 border-b border-zinc-800 pb-4">
                    <Lock className="w-6 h-6 text-emerald-400" />
                    <div>
                      <h4 className="text-sm font-bold text-white uppercase tracking-wider font-sans">Firebase Admin Login</h4>
                      <p className="text-[11px] text-zinc-400 font-sans">Sign in with authorized admin account</p>
                    </div>
                  </div>

                  {authError && (
                    <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-sans leading-relaxed">
                      {authError}
                    </div>
                  )}

                  <div className="space-y-4 text-xs font-mono">
                    <div>
                      <label className="block text-zinc-400 mb-1">Admin Email</label>
                      <input
                        type="email"
                        required
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        placeholder="mhamedwalid@gmail.com or youssefosama@gmail.com"
                        className="w-full bg-[#1a1a20] border border-[#333] p-3 rounded-xl text-white focus:border-emerald-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-zinc-400 mb-1">Firebase Password</label>
                      <input
                        type="password"
                        required
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full bg-[#1a1a20] border border-[#333] p-3 rounded-xl text-white focus:border-emerald-500 focus:outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isLoggingIn}
                      className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
                    >
                      <UserCheck className="w-4 h-4" />
                      {isLoggingIn ? 'Authenticating...' : 'Sign In as Admin'}
                    </button>
                  </div>

                  <div className="pt-2 text-[10px] text-center text-zinc-500 font-mono">
                    Authorized emails: mhamedwalid@gmail.com | youssefosama@gmail.com
                  </div>
                </form>
              )}
            </div>
          ) : (
            /* Authorized Admin CMS Interface */
            <>
              {/* Navigation Tabs */}
              <div className="flex border-b border-[#262626] px-6 bg-[#0f0f11]">
                <button
                  onClick={() => setActiveTab('content')}
                  className={`px-5 py-3 text-xs font-bold tracking-widest uppercase flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
                    activeTab === 'content'
                      ? 'border-emerald-500 text-emerald-400'
                      : 'border-transparent text-zinc-400 hover:text-white'
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  <span>Website Texts ({Object.keys(localContent).length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('projects')}
                  className={`px-5 py-3 text-xs font-bold tracking-widest uppercase flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
                    activeTab === 'projects'
                      ? 'border-emerald-500 text-emerald-400'
                      : 'border-transparent text-zinc-400 hover:text-white'
                  }`}
                >
                  <Database className="w-4 h-4" />
                  <span>Projects Database ({projects.length})</span>
                </button>
              </div>

              {/* Main Content Area */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
                {activeTab === 'content' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between bg-emerald-950/20 border border-emerald-500/20 p-4 rounded-2xl">
                      <div className="text-xs text-emerald-300">
                        💡 Logged in as <span className="font-bold text-white">{currentUser.email}</span>. Edit any text below to save directly to Firebase!
                      </div>
                      <button
                        onClick={handleSaveAllContent}
                        disabled={isSavingContent}
                        className="px-5 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xs tracking-wider uppercase flex items-center gap-2 cursor-pointer shadow-lg transition-all"
                      >
                        {contentSaveSuccess ? (
                          <>
                            <Check className="w-4 h-4" /> Saved to Firebase!
                          </>
                        ) : (
                          <>
                            <Save className="w-4 h-4" /> {isSavingContent ? 'Saving...' : 'Save All Changes'}
                          </>
                        )}
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(localContent).map(([key, val]) => (
                        <div key={key} className="p-3.5 rounded-2xl border border-[#262626] bg-[#121214] space-y-2">
                          <label className="text-[10px] font-mono tracking-widest uppercase text-emerald-400 block font-bold">
                            {key}
                          </label>
                          {val.length > 60 ? (
                            <textarea
                              rows={3}
                              value={val}
                              onChange={(e) => handleContentChange(key, e.target.value)}
                              className="w-full bg-[#1a1a1e] border border-[#333] rounded-xl p-2.5 text-xs text-zinc-100 focus:border-emerald-500 focus:outline-none"
                            />
                          ) : (
                            <input
                              type="text"
                              value={val}
                              onChange={(e) => handleContentChange(key, e.target.value)}
                              className="w-full bg-[#1a1a1e] border border-[#333] rounded-xl p-2.5 text-xs text-zinc-100 focus:border-emerald-500 focus:outline-none"
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'projects' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold tracking-wider uppercase text-zinc-300">Firebase Projects</h4>
                      <button
                        onClick={handleCreateNewProject}
                        className="px-4 py-2 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs tracking-wider uppercase flex items-center gap-2 cursor-pointer transition-all"
                      >
                        <Plus className="w-4 h-4" /> Add New Project
                      </button>
                    </div>

                    {/* Edit / Add Modal Form */}
                    {editingProject && (
                      <form onSubmit={handleSaveProject} className="p-5 rounded-3xl border border-emerald-500/40 bg-[#121216] space-y-4">
                        <h5 className="text-xs font-bold text-emerald-400 tracking-wider uppercase border-b border-zinc-800 pb-2">
                          {editingProject.id ? 'Edit Project' : 'Create New Project'}
                        </h5>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                          <div>
                            <label className="block text-zinc-400 mb-1">Project Title</label>
                            <input
                              type="text"
                              required
                              value={editingProject.title || ''}
                              onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                              className="w-full bg-[#1e1e24] border border-[#333] p-2.5 rounded-xl text-white"
                              placeholder="e.g. NXT Brand"
                            />
                          </div>

                          <div>
                            <label className="block text-zinc-400 mb-1">Subtitle / Tagline</label>
                            <input
                              type="text"
                              value={editingProject.subtitle || ''}
                              onChange={(e) => setEditingProject({ ...editingProject, subtitle: e.target.value })}
                              className="w-full bg-[#1e1e24] border border-[#333] p-2.5 rounded-xl text-white"
                              placeholder="e.g. Fashion & Luxury E-Commerce"
                            />
                          </div>

                          <div>
                            <label className="block text-zinc-400 mb-1">Category</label>
                            <input
                              type="text"
                              value={editingProject.category || ''}
                              onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                              className="w-full bg-[#1e1e24] border border-[#333] p-2.5 rounded-xl text-white"
                              placeholder="e.g. E-Commerce"
                            />
                          </div>

                          <div>
                            <label className="block text-zinc-400 mb-1">Live URL</label>
                            <input
                              type="url"
                              value={editingProject.liveUrl || ''}
                              onChange={(e) => setEditingProject({ ...editingProject, liveUrl: e.target.value })}
                              className="w-full bg-[#1e1e24] border border-[#333] p-2.5 rounded-xl text-white"
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
                            className="w-full bg-[#1e1e24] border border-[#333] p-2.5 rounded-xl text-xs text-white"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                          <div>
                            <label className="block text-zinc-400 mb-1">Upload Project Image File</label>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                              className="w-full bg-[#1e1e24] border border-[#333] p-2 rounded-xl text-zinc-300"
                            />
                          </div>

                          <div>
                            <label className="block text-zinc-400 mb-1">Or Image URL directly</label>
                            <input
                              type="text"
                              value={editingProject.imageUrl || ''}
                              onChange={(e) => setEditingProject({ ...editingProject, imageUrl: e.target.value })}
                              className="w-full bg-[#1e1e24] border border-[#333] p-2.5 rounded-xl text-white"
                              placeholder="https://..."
                            />
                          </div>
                        </div>

                        <div className="flex items-center justify-end gap-3 pt-2">
                          <button
                            type="button"
                            onClick={() => setEditingProject(null)}
                            className="px-4 py-2 rounded-full border border-zinc-700 text-zinc-400 text-xs hover:bg-zinc-800"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            disabled={isSavingProject || uploadingImage}
                            className="px-5 py-2 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs uppercase flex items-center gap-2"
                          >
                            <Save className="w-4 h-4" />
                            {isSavingProject ? 'Saving to Firebase...' : 'Save Project'}
                          </button>
                        </div>
                      </form>
                    )}

                    {/* Projects Cards List */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {projects.map((proj) => (
                        <div key={proj.id} className="p-4 rounded-2xl border border-[#262626] bg-[#111114] flex gap-4 items-center">
                          <img
                            src={proj.imageUrl}
                            alt={proj.title}
                            className="w-20 h-20 object-cover rounded-xl border border-zinc-800"
                          />
                          <div className="flex-1 min-w-0">
                            <h5 className="text-sm font-bold text-white truncate">{proj.title}</h5>
                            <p className="text-xs text-emerald-400 truncate">{proj.category}</p>
                            <a href={proj.liveUrl} target="_blank" rel="noreferrer" className="text-[11px] text-zinc-400 underline truncate block">
                              {proj.liveUrl}
                            </a>
                          </div>
                          <div className="flex flex-col gap-2">
                            <button
                              onClick={() => setEditingProject(proj)}
                              className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white cursor-pointer"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteProject(proj.id)}
                              className="p-2 rounded-lg bg-rose-500/20 hover:bg-rose-500/40 text-rose-400 cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}

                      {projects.length === 0 && (
                        <div className="col-span-full p-8 text-center text-zinc-500 text-xs border border-dashed border-zinc-800 rounded-3xl">
                          No projects currently in Firebase. Click "Add New Project" above to create one!
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
