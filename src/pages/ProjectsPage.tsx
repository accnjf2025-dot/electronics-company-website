import { useState } from 'react'
import {
  ProjectGrid,
  ProjectsEmptyState,
  ProjectsFilterDrawer,
  ProjectsFilters,
  ProjectsPageHero,
  ProjectsToolbar,
} from '@/components/projects'
import { useProjectFilters } from '@/hooks'
import { useTranslation } from '@/utils'
import { getProjectLocationFilterOptions } from '@/utils/projectPortfolio'

export function ProjectsPage() {
  const { t } = useTranslation()
  const { filters, filteredProjects, setFilter, clearFilters } = useProjectFilters()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [filterResetKey, setFilterResetKey] = useState(0)
  const locationOptions = getProjectLocationFilterOptions()

  const handleClearFilters = () => {
    clearFilters()
    setFilterResetKey((key) => key + 1)
  }

  return (
    <>
      <ProjectsPageHero />

      <section className="overflow-x-hidden bg-surface-50">
        <div className="container-main px-4 py-8 sm:px-6 md:py-10 lg:px-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(230px,260px)_minmax(0,1fr)] lg:gap-8">
            <aside className="hidden min-w-0 lg:block">
              <div className="sticky top-20 rounded-xl border border-surface-200 bg-white p-5 shadow-soft">
                <h2 className="mb-4 text-base font-bold text-brand-navy">
                  {t.projectsCatalog.filters}
                </h2>
                <ProjectsFilters
                  filters={filters}
                  locationOptions={locationOptions}
                  onFilterChange={setFilter}
                  onClearFilters={handleClearFilters}
                />
              </div>
            </aside>

            <div className="min-w-0">
              <ProjectsToolbar
                filters={filters}
                resultCount={filteredProjects.length}
                onSearchChange={(search) => setFilter('search', search)}
                onSortChange={(sort) => setFilter('sort', sort)}
                onOpenFilters={() => setDrawerOpen(true)}
                resetKey={filterResetKey}
              />

              {filteredProjects.length === 0 ? (
                <ProjectsEmptyState onClearFilters={handleClearFilters} />
              ) : (
                <ProjectGrid projects={filteredProjects} />
              )}
            </div>
          </div>
        </div>
      </section>

      <ProjectsFilterDrawer
        open={drawerOpen}
        filters={filters}
        locationOptions={locationOptions}
        onClose={() => setDrawerOpen(false)}
        onFilterChange={setFilter}
        onClearFilters={handleClearFilters}
        onApply={() => setDrawerOpen(false)}
      />
    </>
  )
}
