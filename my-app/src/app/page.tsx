import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col relative">
      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-10 py-4">
        <div className="container mx-auto px-4 flex justify-end gap-4">
          <Link
            href="/login"
            className="text-white hover:text-blue-100 transition-colors font-semibold"
          >
            Se connecter
          </Link>
          <Link
            href="/signup"
            className="bg-white text-blue-600 px-6 py-2 rounded-full font-semibold hover:bg-blue-50 transition-colors"
          >
            S'inscrire
          </Link>
        </div>
      </nav>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-blue-600 to-blue-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">Yalla Clean</h1>
            <p className="text-xl mb-8">Votre partenaire de confiance pour des services de nettoyage professionnels et des produits d'entretien de qualité</p>
            <div className="flex justify-center gap-4">
              <Link 
                href="/services" 
                className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors"
              >
                Réserver un service
              </Link>
              <Link 
                href="/products" 
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition-colors"
              >
                Nos produits
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Nos Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-50 rounded-xl">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Nettoyage Résidentiel</h3>
              <p className="text-gray-600">Des services de nettoyage personnalisés pour votre maison ou appartement.</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Nettoyage Commercial</h3>
              <p className="text-gray-600">Solutions professionnelles pour bureaux, commerces et espaces professionnels.</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Produits d'Entretien</h3>
              <p className="text-gray-600">Une gamme complète de produits professionnels pour tous vos besoins.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Prêt à commencer ?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">Rejoignez les milliers de clients satisfaits qui font confiance à Yalla Clean pour leurs besoins en nettoyage.</p>
          <Link 
            href="/contact" 
            className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors inline-block"
          >
            Contactez-nous
          </Link>
        </div>
      </section>
    </main>
  )
}
