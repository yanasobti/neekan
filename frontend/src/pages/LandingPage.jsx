import Hero from '../components/Hero'
import AuthorizedBrands from '../components/AuthorizedBrands'
import Certifications from '../components/Certifications'
import TrustBadges from '../components/TrustBadges'

function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <AuthorizedBrands />
      <Certifications />
      <TrustBadges />
    </div>
  )
}

export default LandingPage
