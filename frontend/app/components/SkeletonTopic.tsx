export default function SkeletonTopic({ topicKey }: { topicKey: string }) {
  return (
    <div className='mx-auto max-w-3xl'>
      <div className='overflow-hidden rounded-2xl border border-[#1F1F1F] bg-[#0B0B0B] shadow-[0_0_0_1px_rgba(255,255,255,0.02)]'>
        <div className='border-b border-[#1F1F1F] bg-[#0E0E0E] px-6 py-4'>
          <div className='inline-flex items-center gap-2 rounded-full border border-[#2A2A2A] bg-[#111111] px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-[#B4B4B4]'>
            Draft section
          </div>
        </div>

        <div className='space-y-6 p-8 md:p-10'>
          <div className='space-y-3'>
            <h2 className='text-3xl font-semibold tracking-[-0.06em] text-white md:text-4xl'>
              This topic is still being written.
            </h2>
            <p className='max-w-2xl text-base leading-7 text-[#B8B8B8]'>
              The reference for <span className='font-medium text-[#C699FF]'>{topicKey}</span> is queued up for later, and it will be expanded into a full guide with examples, explanations, and patterns.
            </p>
          </div>

          <div className='flex flex-wrap gap-3 text-[11px] font-medium uppercase tracking-[0.2em] text-[#8B8B8B]'>
            <span className='rounded-full border border-[#2A2A2A] bg-[#111111] px-3 py-1.5'>Examples</span>
            <span className='rounded-full border border-[#2A2A2A] bg-[#111111] px-3 py-1.5'>Patterns</span>
            <span className='rounded-full border border-[#2A2A2A] bg-[#111111] px-3 py-1.5'>Best practices</span>
          </div>

          <div className='rounded-xl border border-[#1F1F1F] bg-[#101010] p-4'>
            <p className='text-sm leading-7 text-[#D0D0D0]'>
              Until then, you can explore the rest of the library or check the project author:
              <a
                href='https://github.com/yash-pluto'
                target='_blank'
                rel='noopener noreferrer'
                className='ml-2 font-medium text-[#C699FF] underline decoration-[#C699FF]/50 underline-offset-4 transition hover:text-[#D7B9FF]'
              >
                @Yash-pluto
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
