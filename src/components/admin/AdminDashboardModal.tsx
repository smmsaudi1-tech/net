import React, { useState } from 'react';
import { useAgency } from '../../store/agencyContext';
import { ProjectCategory } from '../../types';
import { Shield, X, Plus, Trash2, Star, CheckCircle2, Lock, MessageSquare, ExternalLink, RefreshCw } from 'lucide-react';

export const AdminDashboardModal: React.FC = () => {
  const {
    isAdminOpen,
    setIsAdminOpen,
    isAdminAuthenticated,
    loginAdmin,
    logoutAdmin,
    projects,
    addProject,
    deleteProject,
    toggleFeaturedProject,
    inquiries,
    resolveInquiry,
    agencyInfo
  } = useAgency();

  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState(false);

  const [activeTab, setActiveTab] = useState<'projects' | 'inquiries' | 'settings'>('projects');

  // New Project Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<ProjectCategory>('fashion');
  const [clientName, setClientName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [liveUrl, setLiveUrl] = useState('');
  const [techStackStr, setTechStackStr] = useState('');
  const [metrics, setMetrics] = useState('');
  const [featured, setFeatured] = useState(true);
  const [projectAddedSuccess, setProjectAddedSuccess] = useState(false);

  if (!isAdminOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginAdmin(passwordInput)) {
      setAuthError(false);
      setPasswordInput('');
    } else {
      setAuthError(true);
    }
  };

  const handleAddProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && imageUrl.trim()) {
      addProject({
        title,
        category,
        clientName: clientName || 'عميل NextGen',
        description,
        imageUrl,
        liveUrl: liveUrl || 'https://nextgendevs.studio',
        techStack: techStackStr ? techStackStr.split(',').map((t) => t.trim()) : ['React', 'Tailwind'],
        metrics: metrics || '+300% زيادة مبيعات',
        featured
      });

      // Clear Form
      setTitle('');
      setClientName('');
      setDescription('');
      setImageUrl('');
      setLiveUrl('');
      setTechStackStr('');
      setMetrics('');
      setProjectAddedSuccess(true);
      setTimeout(() => setProjectAddedSuccess(false), 3000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-2xl flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
      <div className="bg-[#0b0f19] border border-cyan-500/40 rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl space-y-0 my-8">
        
        {/* Modal Header */}
        <div className="p-6 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-100 flex items-center gap-2">
                NextGen Devs — Studio OS (Admin CMS)
              </h3>
              <p className="text-xs text-slate-400">إدارة المشاريع، الطلبات، وإضافة أعمال جديدة للبراند</p>
            </div>
          </div>

          <button
            onClick={() => setIsAdminOpen(false)}
            className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* If Not Authenticated Show Password Screen */}
        {!isAdminAuthenticated ? (
          <div className="p-8 max-w-md mx-auto space-y-6 text-center">
            <div className="w-16 h-16 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mx-auto">
              <Lock className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h4 className="text-xl font-extrabold text-slate-100">تسجيل دخول مدير الاستوديو (Admin)</h4>
              <p className="text-xs text-slate-400">أدخل كلمة المرور (الافتراضية: <span className="font-mono text-cyan-300">1234</span>)</p>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <input
                type="password"
                placeholder="كلمة المرور (1234)"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                required
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-2xl text-center text-sm text-slate-100 font-mono focus:border-cyan-500 focus:outline-none"
              />

              {authError && (
                <p className="text-xs text-rose-400 font-bold">❌ كلمة المرور غير صحيحة، حاول مجدداً.</p>
              )}

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-extrabold text-xs shadow-lg shadow-cyan-500/25 transition-all cursor-pointer"
              >
                تسجيل الدخول للوحة التحكم
              </button>
            </form>
          </div>
        ) : (
          /* Admin Main CMS Interface */
          <div className="p-6 space-y-6 text-right">
            
            {/* Tabs Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('projects')}
                  className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                    activeTab === 'projects'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  إدارة المشاريع ({projects.length})
                </button>
                <button
                  onClick={() => setActiveTab('inquiries')}
                  className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer relative ${
                    activeTab === 'inquiries'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  الطلبات والاستشارات ({inquiries.length})
                  {inquiries.some((i) => i.status === 'new') && (
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                  )}
                </button>
              </div>

              <button
                onClick={logoutAdmin}
                className="px-3 py-1.5 rounded-xl bg-slate-900 text-slate-400 border border-slate-800 text-[10px] font-bold hover:text-rose-400 transition-all cursor-pointer"
              >
                خروج
              </button>
            </div>

            {/* TAB 1: MANAGE PROJECTS */}
            {activeTab === 'projects' && (
              <div className="space-y-8">
                
                {/* Form to Add New Project */}
                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                  <h4 className="text-sm font-extrabold text-cyan-300 flex items-center gap-2">
                    <Plus className="w-4 h-4" /> إضافة مشروع جديد لمعرض الأعمال
                  </h4>

                  <form onSubmit={handleAddProjectSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] font-bold text-slate-400 block mb-1">عنوان المشروع:</label>
                      <input
                        type="text"
                        placeholder="مثال: Vogue Luxe — متجر ملابس وفاشون"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="w-full px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-100 focus:border-cyan-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-slate-400 block mb-1">قسم المشروع:</label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value as ProjectCategory)}
                        className="w-full px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-100 focus:border-cyan-500 focus:outline-none"
                      >
                        <option value="fashion">👗 براند ملابس وفاشون</option>
                        <option value="cafe_restaurant">☕ كافيه ومطعم</option>
                        <option value="ecommerce">🛍️ متجر إلكتروني</option>
                        <option value="custom_app">⚡ تطبيق مخصص</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-slate-400 block mb-1">اسم العميل:</label>
                      <input
                        type="text"
                        placeholder="مثال: شركة Vogue International"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        className="w-full px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-100 focus:border-cyan-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-slate-400 block mb-1">رابط صورة المشروع (Image URL):</label>
                      <input
                        type="url"
                        placeholder="https://images.unsplash.com/photo-..."
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        required
                        className="w-full px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-100 focus:border-cyan-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-slate-400 block mb-1">رابط المعاينة المباشرة (Live Link):</label>
                      <input
                        type="url"
                        placeholder="https://client-brand.vercel.app"
                        value={liveUrl}
                        onChange={(e) => setLiveUrl(e.target.value)}
                        className="w-full px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-100 focus:border-cyan-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-slate-400 block mb-1">التقنيات (مفصولة بفاصلة):</label>
                      <input
                        type="text"
                        placeholder="React, Tailwind, Paymob, Three.js"
                        value={techStackStr}
                        onChange={(e) => setTechStackStr(e.target.value)}
                        className="w-full px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-100 focus:border-cyan-500 focus:outline-none"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="text-[11px] font-bold text-slate-400 block mb-1">وصف المشروع والإنجازات:</label>
                      <textarea
                        placeholder="اكتب وصفاً جذاباً لما حققه المشروع لعميلك..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={2}
                        className="w-full px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-100 focus:border-cyan-500 focus:outline-none resize-none"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-slate-400 block mb-1">مؤشر الإنجاز (Metrics):</label>
                      <input
                        type="text"
                        placeholder="+350% زيادة مبيعات"
                        value={metrics}
                        onChange={(e) => setMetrics(e.target.value)}
                        className="w-full px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-100 focus:border-cyan-500 focus:outline-none"
                      />
                    </div>

                    <div className="flex items-center gap-2 self-end pb-2">
                      <input
                        type="checkbox"
                        id="featCheck"
                        checked={featured}
                        onChange={(e) => setFeatured(e.target.checked)}
                        className="w-4 h-4 rounded text-cyan-500 focus:ring-0"
                      />
                      <label htmlFor="featCheck" className="text-xs font-bold text-slate-300 cursor-pointer">
                        عرض المشروع كـ مشروع مميز (Featured)
                      </label>
                    </div>

                    <div className="sm:col-span-2 pt-2">
                      <button
                        type="submit"
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-extrabold text-xs shadow-lg transition-all cursor-pointer"
                      >
                        ➕ إضافـة المشروع للمعرض فوراً
                      </button>
                    </div>
                  </form>

                  {projectAddedSuccess && (
                    <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold text-center animate-fade-in">
                      ✅ تم إضافة المشروع ونشره بنجاح في معرض أعمال NextGen Devs!
                    </div>
                  )}
                </div>

                {/* Projects Table List */}
                <div className="space-y-3">
                  <h4 className="text-xs font-extrabold text-slate-400">قائمة المشاريع الحالية في الاستوديو:</h4>
                  <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                    {projects.map((proj) => (
                      <div key={proj.id} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-3 text-xs font-mono">
                        <div className="flex items-center gap-3">
                          <img src={proj.imageUrl} alt={proj.title} className="w-10 h-10 rounded-lg object-cover" />
                          <div>
                            <p className="font-bold text-slate-100 font-sans">{proj.title}</p>
                            <p className="text-[10px] text-slate-400">{proj.clientName} • {proj.category}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => toggleFeaturedProject(proj.id)}
                            className={`p-2 rounded-lg border cursor-pointer ${proj.featured ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' : 'bg-slate-900 text-slate-500 border-slate-800'}`}
                            title="تمييز"
                          >
                            <Star className="w-4 h-4 fill-current" />
                          </button>

                          <button
                            onClick={() => deleteProject(proj.id)}
                            className="p-2 rounded-lg bg-rose-500/20 text-rose-300 border border-rose-500/30 cursor-pointer"
                            title="حذف"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* TAB 2: INQUIRIES */}
            {activeTab === 'inquiries' && (
              <div className="space-y-4">
                <h4 className="text-xs font-extrabold text-slate-400">طلبات الاستشارة والتسعير الواردة من العملاء:</h4>

                {inquiries.length === 0 ? (
                  <p className="text-xs text-slate-500 text-center py-8">لا توجد طلبات جديدة حالياً.</p>
                ) : (
                  <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                    {inquiries.map((inq) => (
                      <div key={inq.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <h5 className="font-bold text-slate-100 text-sm">{inq.clientName}</h5>
                            <p className="text-xs text-cyan-400">{inq.businessType} • {inq.phone}</p>
                          </div>
                          <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 font-mono">
                            ${inq.estimatedPrice}
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-1">
                          {inq.featuresSelected.map((f, i) => (
                            <span key={i} className="px-2 py-0.5 rounded-lg bg-slate-900 border border-slate-800 text-[10px] text-slate-300">
                              {f}
                            </span>
                          ))}
                        </div>

                        <div className="pt-2 border-t border-slate-900 flex items-center justify-between text-xs">
                          <span className="text-[10px] text-slate-500">{inq.date}</span>
                          <a
                            href={`https://wa.me/${inq.phone.replace(/\+/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => resolveInquiry(inq.id)}
                            className="px-3 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 font-bold flex items-center gap-1 cursor-pointer"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                            مراسلة عبر الواتساب
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
