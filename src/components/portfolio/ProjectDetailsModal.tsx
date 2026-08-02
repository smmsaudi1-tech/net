import React from 'react';
import { useAgency } from '../../store/agencyContext';
import { X, ExternalLink, TrendingUp, Calendar, CheckCircle2, Shield, Trash2, Star } from 'lucide-react';

export const ProjectDetailsModal: React.FC = () => {
  const { selectedProject, setSelectedProject, isAdminAuthenticated, deleteProject, toggleFeaturedProject } = useAgency();

  if (!selectedProject) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
      <div className="bg-[#0b0f19] border border-cyan-500/30 rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl space-y-0 my-8">
        
        {/* Modal Header Bar */}
        <div className="p-4 sm:p-6 bg-slate-900/80 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full text-[10px] font-black bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              {selectedProject.category === 'fashion' ? '👗 براند ملابس وفاشون' : selectedProject.category === 'cafe_restaurant' ? '☕ كافيه ومطعم' : '🛍️ متجر إلكتروني'}
            </span>
            <span className="text-xs text-slate-400 font-mono">تاريخ الإطلاق: {selectedProject.date}</span>
          </div>

          <button
            onClick={() => setSelectedProject(null)}
            className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Project Hero Image */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden group">
          <img
            src={selectedProject.imageUrl}
            alt={selectedProject.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19] via-transparent to-transparent" />
          
          <div className="absolute bottom-4 right-4 left-4 flex items-center justify-between">
            <div className="px-4 py-2 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-black backdrop-blur-md flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span>{selectedProject.metrics}</span>
            </div>
            
            {selectedProject.featured && (
              <div className="px-3 py-1.5 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-black backdrop-blur-md flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span>مشروع مميز (Featured)</span>
              </div>
            )}
          </div>
        </div>

        {/* Body Content */}
        <div className="p-6 space-y-6 text-right">
          <div>
            <h2 className="text-2xl font-black text-slate-100">{selectedProject.title}</h2>
            <p className="text-xs text-cyan-400 font-bold mt-1">العميل: {selectedProject.clientName}</p>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
            {selectedProject.description}
          </p>

          {/* Tech Badges */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-400">التقنيات المستخدمة في البناء (Tech Stack):</h4>
            <div className="flex flex-wrap gap-2">
              {selectedProject.techStack.map((tech, idx) => (
                <span key={idx} className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-300 font-bold">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            <a
              href={selectedProject.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-extrabold text-xs shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>🔗 المعاينة المباشرة (Live Preview)</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            {/* Admin Management Controls if Logged in */}
            {isAdminAuthenticated && (
              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <button
                  onClick={() => toggleFeaturedProject(selectedProject.id)}
                  className="px-3.5 py-2.5 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <Star className="w-3.5 h-3.5" />
                  <span>{selectedProject.featured ? 'إلغاء التمييز' : 'تمييز المشروع'}</span>
                </button>

                <button
                  onClick={() => {
                    deleteProject(selectedProject.id);
                    setSelectedProject(null);
                  }}
                  className="px-3.5 py-2.5 rounded-xl bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>حذف</span>
                </button>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
