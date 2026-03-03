import { useState, useMemo } from 'react'
import ReviewInput from './ReviewInput'
import ToneSelector from './ToneSelector'
import ResponseCard from './ResponseCard'
import StrategyBox from './StrategyBox'
import PlatformTip from './PlatformTip'
import { generateResponses, extractKeywords } from './templateEngine'

const DEFAULT_FORM = {
  reviewText: '',
  stars: 0,
  platform: 'google',
  industry: 'restaurant',
  businessName: '',
}

export default function App() {
  const [formData, setFormData] = useState(DEFAULT_FORM)
  const [tone, setTone] = useState('professional')
  const [responses, setResponses] = useState(null)
  const [hasGenerated, setHasGenerated] = useState(false)

  const fillTestData = () => {
    setFormData({
      reviewText: 'We had an amazing dinner here last Saturday night. The pasta was cooked perfectly al dente and the tiramisu was the best I\'ve ever had. Our server Maria was incredibly attentive and knowledgeable about the wine pairings. The only minor issue was the wait time for a table — about 25 minutes even with a reservation. But overall, a wonderful experience and we\'ll definitely be back!',
      stars: 4,
      platform: 'google',
      industry: 'restaurant',
      businessName: 'Bella Cucina Italian Kitchen',
    })
    setTone('friendly')
    setResponses(null)
    setHasGenerated(false)
  }

  const canGenerate = formData.reviewText.trim().length > 0 && formData.stars > 0

  const detectedKeywords = useMemo(() => {
    if (!formData.reviewText.trim()) return {}
    return extractKeywords(formData.reviewText)
  }, [formData.reviewText])

  const detectedCount = Object.keys(detectedKeywords).length

  const isNegative = formData.stars >= 1 && formData.stars <= 2

  const handleGenerate = () => {
    if (!canGenerate) return
    const result = generateResponses({
      reviewText: formData.reviewText,
      stars: formData.stars,
      platform: formData.platform,
      industry: formData.industry,
      businessName: formData.businessName,
      tone,
    })
    setResponses(result)
    setHasGenerated(true)
  }

  const handleReset = () => {
    setFormData(DEFAULT_FORM)
    setTone('professional')
    setResponses(null)
    setHasGenerated(false)
  }

  const sentimentLabel = formData.stars <= 2 ? 'Negative' : formData.stars >= 4 ? 'Positive' : 'Neutral'

  return (
    <div className="bg-abyss min-h-screen bg-glow bg-grid">
      <div className="relative z-10 max-w-[1600px] mx-auto px-4 py-8 sm:py-12 animate-fadeIn">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-galactic">
          <a href="https://seo-tools-tau.vercel.app/" className="text-azure hover:text-white transition-colors">Free Tools</a>
          <span className="mx-2 text-metal">/</span>
          <a href="https://seo-tools-tau.vercel.app/local-business/" className="text-azure hover:text-white transition-colors">Local Business Tools</a>
          <span className="mx-2 text-metal">/</span>
          <span className="text-cloudy">Review Response Generator</span>
        </nav>

        {/* Header */}
        <div className="mb-8 sm:mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-azure/10 border border-azure/20">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-azure" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white">Review Response Generator</h1>
            </div>
          </div>
          <p className="text-cloudy text-sm sm:text-base max-w-2xl">
            Generate 3 professional response variations for any customer review. Paste the review, select your parameters, and get ready-to-copy responses tailored to your platform and industry.
          </p>
        </div>

        <div className="flex justify-end mb-4">
          <button
            type="button"
            onClick={fillTestData}
            className="px-3 py-1.5 text-xs font-mono bg-prince/20 text-prince border border-prince/30 rounded hover:bg-prince/30 transition-colors focus:outline-none focus:ring-2 focus:ring-prince focus:ring-offset-2 focus:ring-offset-abyss"
          >
            Fill Test Data
          </button>
        </div>

        {/* Main Layout */}
        <div className="space-y-6">
          {/* Input Section */}
          <ReviewInput formData={formData} onChange={setFormData} />

          {/* Tone Selector */}
          <ToneSelector selected={tone} onSelect={setTone} />

          {/* Detected Keywords Badge */}
          {formData.reviewText.trim().length > 0 && (
            <div className="flex flex-wrap items-center gap-2 animate-fadeIn">
              <span className="text-xs text-galactic">Detected topics:</span>
              {detectedCount > 0 ? (
                Object.keys(detectedKeywords).map((cat) => (
                  <span
                    key={cat}
                    className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-prince/10 text-prince border border-prince/20"
                  >
                    {cat.replace('_', ' ')}
                  </span>
                ))
              ) : (
                <span className="text-xs text-galactic italic">No specific topics detected — a general response will be generated</span>
              )}
            </div>
          )}

          {/* Star Sentiment Indicator */}
          {formData.stars > 0 && (
            <div className="flex items-center gap-2 animate-fadeIn">
              <span className="text-xs text-galactic">Review sentiment:</span>
              <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
                formData.stars <= 2
                  ? 'bg-coral/10 text-coral border-coral/20'
                  : formData.stars >= 4
                    ? 'bg-turtle/10 text-turtle border-turtle/20'
                    : 'bg-tangerine/10 text-tangerine border-tangerine/20'
              }`}>
                {sentimentLabel} ({formData.stars} star{formData.stars !== 1 ? 's' : ''})
              </span>
            </div>
          )}

          {/* Generate Button */}
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleGenerate}
              disabled={!canGenerate}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-200 min-h-[48px] focus:outline-none focus:ring-2 focus:ring-azure focus:ring-offset-2 focus:ring-offset-abyss ${
                canGenerate
                  ? 'bg-azure text-white hover:bg-azure-hover active:scale-[0.98] cursor-pointer'
                  : 'bg-metal/20 text-galactic cursor-not-allowed'
              }`}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
              </svg>
              Generate Responses
            </button>
            {hasGenerated && (
              <button
                type="button"
                onClick={handleReset}
                className="flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-medium border border-metal/30 text-cloudy hover:text-white hover:border-metal/50 transition-all duration-200 min-h-[48px] cursor-pointer focus:outline-none focus:ring-2 focus:ring-azure focus:ring-offset-2 focus:ring-offset-abyss"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" />
                </svg>
                Start Over
              </button>
            )}
          </div>

          {/* Validation Hints */}
          {!canGenerate && formData.reviewText.trim().length === 0 && formData.stars === 0 && (
            <p className="text-xs text-galactic">Paste a review and select a star rating to generate responses.</p>
          )}
          {!canGenerate && formData.reviewText.trim().length > 0 && formData.stars === 0 && (
            <p className="text-xs text-tangerine">Select a star rating to continue.</p>
          )}
          {!canGenerate && formData.reviewText.trim().length === 0 && formData.stars > 0 && (
            <p className="text-xs text-tangerine">Paste the customer review text to continue.</p>
          )}

          {/* Results Section */}
          {responses && (
            <div className="space-y-6 mt-2">
              {/* Negative Review Strategy Box */}
              {isNegative && <StrategyBox />}

              {/* Response Cards */}
              <div className="space-y-4">
                <h2 className="text-lg font-bold text-white">
                  Your Response Options
                </h2>
                <div className="grid grid-cols-1 gap-4">
                  {responses.map((response, i) => (
                    <ResponseCard key={response.letter} response={response} index={i} />
                  ))}
                </div>
              </div>

              {/* Platform Tip */}
              <PlatformTip platform={formData.platform} />
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-metal/30">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-galactic">
            <p>
              Built by{' '}
              <a
                href="https://www.dreamhost.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-azure hover:text-white transition-colors"
              >
                DreamHost
              </a>
            </p>
            <p>
              Responses are template-generated starting points. Always personalize before sending.
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}
