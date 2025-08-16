import { FC } from 'react';
import linkIcon from '../../assets/symbols/link.svg';
import './ProjectsBox.css';

interface ProjectLink {
    type: 'github' | 'figma' | 'website' | 'demo';
    url: string;
    label?: string;
}

interface ProjectsBoxProps {
    title: string;
    subtitle: string;
    links?: ProjectLink[];
    className?: string;
    accentColor?: string;
}

export const ProjectsBox: FC<ProjectsBoxProps> = ({ 
    title, 
    subtitle, 
    links = [],
    className = '',
    accentColor
}) => {
    const getLinkIcon = () => {
        // For now using the same link icon, but can be expanded
        return linkIcon;
    };

    const getLinkLabel = (link: ProjectLink) => {
        if (link.label) return link.label;
        
        switch (link.type) {
            case 'github':
                return 'GitHub';
            case 'figma':
                return 'Figma';
            case 'website':
                return 'Website';
            case 'demo':
                return 'Demo';
            default:
                return 'Link';
        }
    };

    return (
        <div className={`projects-box ${className}`}>
            <div 
                className="projects-box-accent"
                style={accentColor ? { backgroundColor: accentColor } : undefined}
            ></div>
            <div className="projects-box-content">
                <h3 
                    className="projects-box-title"
                    style={accentColor ? { color: accentColor } : undefined}
                >
                    {title}
                </h3>
                <p className="projects-box-subtitle">{subtitle}</p>
                
                {links.length > 0 && (
                    <div className="projects-box-links">
                        {links.map((link, index) => (
                            <a
                                key={index}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`projects-box-link projects-box-link-${link.type}`}
                                style={accentColor ? { 
                                    borderColor: accentColor,
                                    '--hover-bg': accentColor
                                } as React.CSSProperties : undefined}
                            >
                                <img 
                                    src={getLinkIcon()} 
                                    alt="" 
                                    className="projects-box-link-icon" 
                                />
                                <span>{getLinkLabel(link)}</span>
                            </a>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};