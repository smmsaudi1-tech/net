import React from 'react';
import { useAgency } from '../../store/agencyContext';
import { AgencyProject, ProjectCategory } from '../../types';
import { Sparkles, Eye, TrendingUp, Filter, ExternalLink, Shirt, Utensils, ShoppingBag, Layers } from 'lucide-react';

export const ProjectsShowcase: React.FC = () => {
  const { projects, selectedCategory, setSelectedCategory, setSelectedProject } = useAgency();

  const categories: { id: string; label: string; icon: any }[] = [
    { id: 'all', label: 'الكل (All Works)', icon: Layers },
    { id: 'fashion', label: '👗 براندات ملابس وفاشون', icon: Shirt },
    { id: 'cafe_restaurant', label: '☕ كافيهات ومطاعم', icon: Utensils },
    { id: 'ecommerce', label: '🛍️ متاجر إلكترونية', icon: ShoppingBag }
  ];

  const filteredProjects = projects.filter((p) => {
    if (selectedCategory === 'all') return true;
    return p.category === selectedCategory;
  });

  return (
    <section id="portfolio" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 space-y-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-xl text-right">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-black">
              <Sparkles className="w-3.5 h-3.5" />
              <span>أحدث إبداعاتنا</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-100 tracking-tight">
              معرض أعمال <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">NextGen Devs</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              استعرض النماذج الحية للمشاريع التي قمنا بتنفيذها وإشهارها بنجاح للبراندات والمطاعم.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const active = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2.5 rounded-2xl text-xs font-extrabold flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
                    active
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25 border border-cyan-400/40'
                      : 'bg-slate-900/90 text-slate-400 border border-slate-800 hover:border-slate-700 hover:text-slate-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="nexus-card rounded-3xl overflow-hidden group hover:border-cyan-500/50 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Image Box */}
              <div className="relative h-60 w-full overflow-hidden">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19] via-slate-950/20 to-transparent opacity-80" />

                {/* Badge Category */}
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 rounded-full text-[10px] font-black bg-slate-950/80 backdrop-blur-md text-cyan-300 border border-cyan-500/30">
                    {project.category === 'fashion' ? '👗 براند ملابس' : project.category === 'cafe_restaurant' ? '☕ كافيه ومطعم' : '🛍️ متجر إلكتروني'}
                  </span>
                </div>

                {/* Metrics Pill */}
                <div className="absolute bottom-3 right-3 left-3 flex items-center justify-between">
                  <span className="px-3 py-1.5 rounded-xl bg-emerald-500/20 backdrop-blur-md text-emerald-300 border border-emerald-500/30 text-[10px] font-bold flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                    {project.metrics}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 space-y-4 text-right flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="text-lg font-extrabold text-slate-100 group-hover:text-cyan-400 transition-colors line-clamp-1">
                    {project.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed font-sans">
                    {project.description}
                  </p>
                </div>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.techStack.map((tech, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[10px] font-mono text-slate-300">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Card Actions */}
                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="flex-1 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-cyan-500/40 text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Eye className="w-4 h-4 text-cyan-400" />
                    <span>التفاصيل والمعاينة</span>
                  </button>

                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/30 transition-all cursor-pointer"
                    title="زيارة الموقع الحقيقي"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
