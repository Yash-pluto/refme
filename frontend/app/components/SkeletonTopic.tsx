export default function SkeletonTopic({ topicKey }: { topicKey: string }) {
  return (
    <div className='max-w-3xl mx-auto prose prose-lg'>
      <div className='rounded-md border p-8'>
        <h2 className='text-3xl font-extrabold mb-4'>
          The content isn't created yet!
        </h2>
        <p className='mb-6'>We're working on it — thanks for the patience.</p>

        <p className='mb-4'>
          In the meantime, you can check out the project's author:
          <a
            href='https://github.com/yash-pluto'
            target='_blank'
            rel='noopener noreferrer'
            className='ml-2 text-indigo-600 hover:underline'
          >
            @Yash-pluto
          </a>
        </p>

        <p className='text-sm text-gray-500'>
          Requested topic: <span className='font-mono'>{topicKey}</span>
        </p>
      </div>
    </div>
  );
}
