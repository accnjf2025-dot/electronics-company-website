import type { Project } from '@/types'
import { ProjectCard } from './ProjectCard'

interface ProjectGridProps {
  projects: Project[]
}

export function ProjectGrid({ projects }: ProjectGridProps) {
  return (
    <ul className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,300px),1fr))] justify-items-start gap-6">
      {projects.map((project) => (
        <li key={project.id} className="w-full max-w-[420px]">
          <ProjectCard project={project} />
        </li>
      ))}
    </ul>
  )
}
