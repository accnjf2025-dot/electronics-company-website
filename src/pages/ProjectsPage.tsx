import { useState } from 'react'
import {
  ProjectGrid,
  ProjectGridSkeleton,
  ProjectsEmptyState,
  ProjectsErrorState,
  ProjectsFilterDrawer,
  ProjectFiltersSkeleton,
  ProjectsFilters,
  ProjectsPageHero,
  ProjectsToolbar,
} from '@/components/projects'
import {
  useProjectCategories,
  useProjectLocations,
  useProjects,
} from '@/hooks/api'
import { useProjectFilters } from '@/hooks'
import { useTranslation } from '@/utils'

export function ProjectsPage() {
  const { t } = useTranslation()
  const { filters, setFilter, clearFilters } = useProjectFilters()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [filterResetKey, setFilterResetKey] = useState(0)

  const {
    categories,
    loading: categoriesLoading,
    retry: retryCategories,
  } = useProjectCategories()
  const {
    locationOptions,
    retry: retryLocations,
  } = useProjectLocations()
  const {
    projects,
    count,
    loading: projectsLoading,
    error: projectsError,
    retry: retryProjects,
  } = useProjects({ filters })

  const handleClearFilters = () => {
    clearFilters()
    setFilterResetKey((key) => key + 1)
  }

  const handleRetryAll = () => {
    retryCategories()
    retryLocations()
    retryProjects()
  }

  const showGridSkeleton = projectsLoading && projects.length === 0
  const showFiltersSkeleton = categoriesLoading && categories.length === 0
  const resultCount = projectsLoading ? 0 : count

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
                {showFiltersSkeleton ? (
                  <ProjectFiltersSkeleton />
                ) : (
                  <ProjectsFilters
                    filters={filters}
                    categories={categories}
                    locationOptions={locationOptions}
                    onFilterChange={setFilter}
                    onClearFilters={handleClearFilters}
                  />
                )}
              </div>
            </aside>

            <div className="min-w-0">
              <ProjectsToolbar
                filters={filters}
                resultCount={resultCount}
                onSearchChange={(search) => setFilter('search', search)}
                onSortChange={(sort) => setFilter('sort', sort)}
                onOpenFilters={() => setDrawerOpen(true)}
                resetKey={filterResetKey}
              />

              {projectsError ? (
                <ProjectsErrorState
                  title={t.projectsCatalog.apiLoadError}
                  description={t.projectsCatalog.apiConnectionError}
                  retryLabel={t.projectsCatalog.tryAgain}
                  onRetry={handleRetryAll}
                />
              ) : showGridSkeleton ? (
                <ProjectGridSkeleton />
              ) : projects.length === 0 ? (
                <ProjectsEmptyState onClearFilters={handleClearFilters} />
              ) : (
                <ProjectGrid projects={projects} />
              )}
            </div>
          </div>
        </div>
      </section>

      <ProjectsFilterDrawer
        open={drawerOpen}
        filters={filters}
        categories={categories}
        locationOptions={locationOptions}
        onClose={() => setDrawerOpen(false)}
        onFilterChange={setFilter}
        onClearFilters={handleClearFilters}
        onApply={() => setDrawerOpen(false)}
      />
    </>
  )
}
