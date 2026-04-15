import { Link } from 'react-router-dom';
import { Clock, Briefcase, GraduationCap, Heart, Globe, Scale, Users, Star, Building, Award, FileText, Shield, Landmark, BookOpen, Plane, Home, Flag, UserCheck, AlertTriangle, Gavel } from 'lucide-react';

const iconMap = { Briefcase, GraduationCap, Heart, Globe, Scale, Users, Star, Building, Award, FileText, Shield, Clock, Landmark, BookOpen, Plane, Home, Flag, UserCheck, AlertTriangle, Gavel };

const difficultyClass = {
  Easy: 'badge-easy',
  Moderate: 'badge-moderate',
  Complex: 'badge-complex',
};

export default function CategoryCard({ category }) {
  const Icon = iconMap[category.icon] || FileText;

  return (
    <Link to={`/category/${category.id}`} className="card block no-underline group">
      <div className="flex items-start gap-4">
        <div className="rounded-lg p-2.5 flex-shrink-0" style={{ backgroundColor: 'var(--color-primary-50)' }}>
          <Icon className="h-6 w-6" style={{ color: 'var(--color-primary-500)' }} />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-base font-bold leading-tight group-hover:text-[var(--color-primary-600)] transition-colors" style={{ color: 'var(--color-text)', fontFamily: 'var(--font-heading)' }}>
            {category.shortName}
          </h3>
          <p className="text-xs mt-0.5 font-medium" style={{ color: 'var(--color-text-light)' }}>{category.name}</p>
          <p className="text-sm mt-2 line-clamp-2" style={{ color: 'var(--color-text-light)' }}>{category.description}</p>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="badge-time">
              <Clock className="h-3 w-3" /> {category.processingTime}
            </span>
            <span className={`badge ${difficultyClass[category.difficulty]}`}>
              {category.difficulty}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
