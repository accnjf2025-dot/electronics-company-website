interface ProcessStep {
  title: string
  description: string
}

interface ProcessStepsProps {
  steps: ProcessStep[]
}

export function ProcessSteps({ steps }: ProcessStepsProps) {
  return (
    <ol className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-4">
      {steps.map((step, index) => (
        <li key={step.title} className="flex h-full flex-col rounded-xl border border-surface-200 bg-white p-5 shadow-soft">
          <span
            className="mb-3 flex size-8 w-fit items-center justify-center rounded-full bg-brand-yellow px-2 text-sm font-bold text-brand-navy"
            aria-hidden="true"
          >
            {index + 1}
          </span>
          <h3 className="font-bold text-brand-navy">{step.title}</h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-text-secondary">{step.description}</p>
        </li>
      ))}
    </ol>
  )
}
