import { useState } from 'react'

const PLATFORMS = [
  { id: 'google', label: 'Google' },
  { id: 'yelp', label: 'Yelp' },
  { id: 'facebook', label: 'Facebook' },
  { id: 'tripadvisor', label: 'TripAdvisor' },
]

const INDUSTRIES = [
  { id: 'restaurant', label: 'Restaurant' },
  { id: 'retail', label: 'Retail' },
  { id: 'healthcare', label: 'Healthcare' },
  { id: 'professional_services', label: 'Professional Services' },
  { id: 'home_services', label: 'Home Services' },
  { id: 'hospitality', label: 'Hospitality' },
  { id: 'automotive', label: 'Automotive' },
  { id: 'beauty_salon', label: 'Beauty / Salon' },
  { id: 'fitness', label: 'Fitness' },
  { id: 'education', label: 'Education' },
]

export default function ReviewInput({ formData, onChange }) {
  const [hoveredStar, setHoveredStar] = useState(0)

  const handleChange = (field, value) => {
    onChange({ ...formData, [field]: value })
  }

  return (
    <div className="card-gradient border border-metal/20 rounded-2xl p-5 sm:p-8 space-y-6">
      <h2 className="text-lg font-bold text-white">Paste the Review</h2>

      {/* Review Text */}
      <div>
        <label htmlFor="reviewText" className="block text-sm font-medium text-cloudy mb-2">
          Customer Review Text
        </label>
        <textarea
          id="reviewText"
          rows={5}
          value={formData.reviewText}
          onChange={(e) => handleChange('reviewText', e.target.value)}
          placeholder="Paste the customer review here..."
          className="w-full bg-abyss border border-metal/30 rounded-lg px-4 py-3 text-white placeholder-galactic focus:outline-none focus:ring-2 focus:ring-azure focus:border-transparent resize-y text-sm sm:text-base min-h-[120px]"
        />
        {formData.reviewText && (
          <p className="text-xs text-galactic mt-1">
            {formData.reviewText.length} characters
          </p>
        )}
      </div>

      {/* Star Rating */}
      <div>
        <label className="block text-sm font-medium text-cloudy mb-2">
          Star Rating
        </label>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => handleChange('stars', star)}
              onMouseEnter={() => setHoveredStar(star)}
              onMouseLeave={() => setHoveredStar(0)}
              className="p-1.5 rounded-lg transition-transform duration-150 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-azure focus:ring-offset-2 focus:ring-offset-abyss"
              aria-label={`${star} star${star !== 1 ? 's' : ''}`}
            >
              <svg
                className={`w-8 h-8 sm:w-10 sm:h-10 transition-colors duration-150 ${
                  star <= (hoveredStar || formData.stars)
                    ? 'text-sunflower'
                    : 'text-metal'
                }`}
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </button>
          ))}
          <span className="ml-3 text-sm text-galactic">
            {formData.stars > 0 ? `${formData.stars} star${formData.stars !== 1 ? 's' : ''}` : 'Select rating'}
          </span>
        </div>
      </div>

      {/* Platform & Industry Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {/* Platform */}
        <div>
          <label htmlFor="platform" className="block text-sm font-medium text-cloudy mb-2">
            Review Platform
          </label>
          <select
            id="platform"
            value={formData.platform}
            onChange={(e) => handleChange('platform', e.target.value)}
            className="w-full bg-abyss border border-metal/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-azure focus:border-transparent text-sm sm:text-base appearance-none cursor-pointer"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%23677983' viewBox='0 0 16 16'%3E%3Cpath d='M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 01.753 1.659l-4.796 5.48a1 1 0 01-1.506 0z'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 1rem center',
              paddingRight: '2.5rem',
            }}
          >
            {PLATFORMS.map((p) => (
              <option key={p.id} value={p.id}>{p.label}</option>
            ))}
          </select>
        </div>

        {/* Industry */}
        <div>
          <label htmlFor="industry" className="block text-sm font-medium text-cloudy mb-2">
            Business Industry
          </label>
          <select
            id="industry"
            value={formData.industry}
            onChange={(e) => handleChange('industry', e.target.value)}
            className="w-full bg-abyss border border-metal/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-azure focus:border-transparent text-sm sm:text-base appearance-none cursor-pointer"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%23677983' viewBox='0 0 16 16'%3E%3Cpath d='M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 01.753 1.659l-4.796 5.48a1 1 0 01-1.506 0z'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 1rem center',
              paddingRight: '2.5rem',
            }}
          >
            {INDUSTRIES.map((i) => (
              <option key={i.id} value={i.id}>{i.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Business Name */}
      <div>
        <label htmlFor="businessName" className="block text-sm font-medium text-cloudy mb-2">
          Your Business Name
        </label>
        <input
          id="businessName"
          type="text"
          value={formData.businessName}
          onChange={(e) => handleChange('businessName', e.target.value)}
          placeholder="e.g., Joe's Coffee Shop"
          className="w-full bg-abyss border border-metal/30 rounded-lg px-4 py-3 text-white placeholder-galactic focus:outline-none focus:ring-2 focus:ring-azure focus:border-transparent text-sm sm:text-base"
        />
      </div>
    </div>
  )
}
