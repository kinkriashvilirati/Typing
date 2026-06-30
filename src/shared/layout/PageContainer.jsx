export default function PageContainer({ className = '', children }) {
  return (
    <main className={`mx-auto w-[min(1120px,calc(100%-40px))] py-12 max-sm:w-[calc(100%-28px)] max-sm:py-8 ${className}`}>
      {children}
    </main>
  )
}
