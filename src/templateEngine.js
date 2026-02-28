// ── Keyword Detection ──────────────────────────────────────────────

const KEYWORD_CATEGORIES = {
  food: ['food', 'meal', 'dish', 'menu', 'taste', 'flavor', 'cook', 'chef', 'portion', 'appetizer', 'entree', 'dessert', 'breakfast', 'lunch', 'dinner', 'pizza', 'burger', 'steak', 'sushi', 'salad', 'soup', 'fresh', 'delicious', 'bland', 'cold food', 'overcooked', 'undercooked', 'raw'],
  service: ['service', 'staff', 'waiter', 'waitress', 'server', 'hostess', 'host', 'bartender', 'cashier', 'employee', 'team', 'crew', 'manager', 'attentive', 'rude', 'friendly', 'helpful', 'ignored', 'polite', 'professional', 'unprofessional', 'courteous'],
  wait: ['wait', 'slow', 'fast', 'quick', 'long time', 'forever', 'minutes', 'hour', 'delay', 'prompt', 'timely', 'rushed', 'efficient', 'took forever', 'waited'],
  price: ['price', 'expensive', 'cheap', 'overpriced', 'affordable', 'value', 'worth', 'cost', 'pricey', 'reasonable', 'budget', 'deal', 'discount', 'rip off', 'ripoff', 'money'],
  quality: ['quality', 'excellent', 'amazing', 'terrible', 'horrible', 'awful', 'fantastic', 'outstanding', 'mediocre', 'average', 'subpar', 'top-notch', 'first-rate', 'poor quality', 'high quality', 'best', 'worst', 'great', 'good', 'bad', 'perfect', 'wonderful', 'superb'],
  cleanliness: ['clean', 'dirty', 'filthy', 'spotless', 'messy', 'hygiene', 'sanitary', 'gross', 'neat', 'tidy', 'dusty', 'bathroom', 'restroom'],
  atmosphere: ['atmosphere', 'ambiance', 'ambience', 'vibe', 'decor', 'decoration', 'music', 'noise', 'noisy', 'quiet', 'cozy', 'comfortable', 'cramped', 'spacious', 'lighting', 'romantic', 'relaxing'],
  location: ['location', 'parking', 'convenient', 'accessible', 'far', 'easy to find', 'neighborhood', 'area', 'downtown'],
  appointment: ['appointment', 'booking', 'reservation', 'schedule', 'on time', 'late', 'no-show', 'cancelled', 'rescheduled', 'availability'],
  communication: ['communication', 'called', 'email', 'phone', 'respond', 'response', 'update', 'follow up', 'return call', 'contact', 'ghosted', 'never heard back'],
  results: ['results', 'outcome', 'work', 'job', 'finished', 'completed', 'repair', 'fix', 'install', 'installation', 'built', 'transformed', 'improvement'],
  experience: ['experience', 'visit', 'trip', 'time', 'stay', 'recommend', 'return', 'come back', 'again', 'first time', 'regular', 'loyal', 'favorite'],
};

export function extractKeywords(reviewText) {
  const lower = reviewText.toLowerCase();
  const detected = {};

  for (const [category, words] of Object.entries(KEYWORD_CATEGORIES)) {
    for (const word of words) {
      if (lower.includes(word)) {
        if (!detected[category]) {
          detected[category] = [];
        }
        detected[category].push(word);
      }
    }
  }

  return detected;
}

export function extractReviewerName() {
  // Try to detect if the review starts with or mentions a name-like pattern
  // This is a simplistic heuristic; in practice, names come from the platform
  return null;
}

// ── Industry-Specific Terms ──────────────────────────────────────

const INDUSTRY_TERMS = {
  restaurant: {
    visit: 'dining experience',
    place: 'restaurant',
    service: 'service and hospitality',
    team: 'team',
    product: 'food and drinks',
    return: 'dine with us again',
    improve: 'kitchen and service teams',
  },
  retail: {
    visit: 'shopping experience',
    place: 'store',
    service: 'customer service',
    team: 'team',
    product: 'products and selection',
    return: 'shop with us again',
    improve: 'team',
  },
  healthcare: {
    visit: 'visit',
    place: 'practice',
    service: 'care',
    team: 'care team',
    product: 'treatment',
    return: 'see us for your next visit',
    improve: 'staff and processes',
  },
  professional_services: {
    visit: 'experience working with us',
    place: 'firm',
    service: 'service',
    team: 'team',
    product: 'work',
    return: 'work with us again',
    improve: 'processes and communication',
  },
  home_services: {
    visit: 'service experience',
    place: 'company',
    service: 'work and professionalism',
    team: 'technicians',
    product: 'work',
    return: 'call on us again',
    improve: 'crew and scheduling',
  },
  hospitality: {
    visit: 'stay',
    place: 'property',
    service: 'hospitality',
    team: 'staff',
    product: 'amenities and accommodations',
    return: 'welcome you back',
    improve: 'housekeeping and front desk teams',
  },
  automotive: {
    visit: 'service experience',
    place: 'shop',
    service: 'automotive care',
    team: 'mechanics and service advisors',
    product: 'repairs and maintenance',
    return: 'bring your vehicle to us again',
    improve: 'service team and processes',
  },
  beauty_salon: {
    visit: 'appointment',
    place: 'salon',
    service: 'services',
    team: 'stylists',
    product: 'services and treatments',
    return: 'visit us again',
    improve: 'team and booking process',
  },
  fitness: {
    visit: 'experience at our facility',
    place: 'gym',
    service: 'programs and classes',
    team: 'trainers and staff',
    product: 'classes and equipment',
    return: 'see you at your next workout',
    improve: 'instructors and facility',
  },
  education: {
    visit: 'learning experience',
    place: 'institution',
    service: 'instruction and support',
    team: 'instructors and staff',
    product: 'courses and programs',
    return: 'continue your learning journey with us',
    improve: 'curriculum and support services',
  },
};

function getTerms(industry) {
  return INDUSTRY_TERMS[industry] || INDUSTRY_TERMS.professional_services;
}

// ── Sentiment-Specific Response Segments ─────────────────────────

// Each segment type has variations keyed by tone: professional, warm, brief

const OPENINGS = {
  negative: {
    professional: [
      'Thank you for taking the time to share your feedback.',
      'We appreciate you bringing this to our attention.',
      'Thank you for your candid feedback.',
      'We appreciate your honest review.',
      'Thank you for letting us know about your experience.',
      'We take all customer feedback seriously, and we appreciate yours.',
    ],
    warm: [
      'Thank you so much for sharing your experience with us.',
      'We really appreciate you taking the time to let us know how we did.',
      'First, thank you for your honest feedback — it truly matters to us.',
      'Thanks for sharing this with us — we want to hear from you.',
      'We genuinely appreciate you letting us know about this.',
      'Thank you for being upfront with us about your experience.',
    ],
    brief: [
      'Thank you for your feedback.',
      'We appreciate your review.',
      'Thanks for letting us know.',
      'Thank you for sharing this.',
      'We appreciate your honest feedback.',
    ],
  },
  positive: {
    professional: [
      'Thank you for your wonderful review.',
      'We sincerely appreciate your kind words.',
      'Thank you for taking the time to share such a positive review.',
      'We are delighted to hear about your positive experience.',
      'Thank you for your generous review and kind feedback.',
      'We truly appreciate your thoughtful review.',
    ],
    warm: [
      'Wow, thank you so much for this amazing review!',
      'This absolutely made our day — thank you!',
      'Thank you for such a wonderful review! We\'re thrilled!',
      'We\'re so happy to hear this — thank you for sharing!',
      'What a fantastic review — this means the world to us!',
      'Thank you so much! Your kind words truly brighten our day!',
    ],
    brief: [
      'Thank you for the great review!',
      'We appreciate the kind words!',
      'Thanks so much for the positive feedback!',
      'Thank you for the wonderful review!',
      'We\'re grateful for your feedback!',
    ],
  },
  neutral: {
    professional: [
      'Thank you for taking the time to share your thoughts.',
      'We appreciate your balanced and thoughtful review.',
      'Thank you for your detailed feedback.',
      'We appreciate you sharing your experience with us.',
      'Thank you for your candid review — we value all feedback.',
      'We appreciate your honest assessment.',
    ],
    warm: [
      'Thank you for sharing your experience with us!',
      'We really appreciate you taking the time to leave this review.',
      'Thanks for the honest feedback — it helps us grow!',
      'We appreciate you sharing both the good and the areas where we can improve.',
      'Thank you for your thoughtful review — every perspective helps us!',
      'Thanks for giving us your honest take!',
    ],
    brief: [
      'Thank you for your review.',
      'We appreciate your feedback.',
      'Thanks for sharing your thoughts.',
      'Thank you for the honest review.',
      'We appreciate your perspective.',
    ],
  },
};

// ── Acknowledgment Segments ──────────────────────────────────────

const ACKNOWLEDGMENTS = {
  negative: {
    professional: [
      'We sincerely apologize that your {visit} did not meet the high standards we set for ourselves.',
      'We are sorry to hear that your {visit} fell short of expectations.',
      'We understand your frustration, and we deeply regret that we did not deliver the level of {service} you deserve.',
      'This is certainly not the experience we strive to provide, and we take your concerns seriously.',
      'We regret that your {visit} was not up to our usual standards.',
      'We hold ourselves to a high standard, and we\'re sorry we fell short during your {visit}.',
    ],
    warm: [
      'We\'re truly sorry that your {visit} wasn\'t what you were hoping for.',
      'We hate to hear this — your satisfaction really matters to us.',
      'We\'re so sorry you had this experience. This isn\'t what we want for any of our customers.',
      'This really isn\'t the experience we want anyone to have, and we\'re sorry you went through this.',
      'We feel terrible about this and want you to know we hear you.',
      'We\'re genuinely sorry — you deserved better and we know it.',
    ],
    brief: [
      'We\'re sorry your experience fell short.',
      'We apologize for the issues you encountered.',
      'This isn\'t up to our standards, and we\'re sorry.',
      'We\'re sorry to hear this.',
      'We apologize for the disappointing experience.',
    ],
  },
  positive: {
    professional: [
      'It is gratifying to know that your {visit} met your expectations.',
      'We are pleased to hear that our {team} delivered an exceptional {visit}.',
      'It means a great deal to us that you had such a positive {visit}.',
      'We are thrilled that our {service} exceeded your expectations.',
      'Hearing that you enjoyed your {visit} reaffirms our commitment to excellence.',
      'We are honored by your recognition of our {team}\'s dedication.',
    ],
    warm: [
      'It makes us so happy to know you had a great {visit}!',
      'We\'re absolutely thrilled that you enjoyed your {visit}!',
      'Hearing this puts a huge smile on our faces!',
      'This is exactly what we love to hear — we\'re so glad!',
      'Nothing makes us happier than knowing our customers are having a wonderful time!',
      'We\'re overjoyed that our {team} could make your {visit} special!',
    ],
    brief: [
      'We\'re glad you had a great experience.',
      'Wonderful to hear you enjoyed your {visit}.',
      'So glad our {team} could deliver a great {visit}.',
      'Happy to hear you had a positive experience.',
      'Glad we could meet your expectations.',
    ],
  },
  neutral: {
    professional: [
      'We appreciate you noting both the strengths and areas for improvement in your {visit}.',
      'Your balanced perspective helps us understand where we excel and where we can grow.',
      'We value your honest assessment of your {visit}.',
      'It is helpful to receive both positive feedback and constructive observations.',
      'We take note of your observations and appreciate the balanced feedback.',
      'Your thoughtful review helps us identify opportunities to enhance our {service}.',
    ],
    warm: [
      'We\'re glad there were parts of your {visit} you enjoyed, and we hear you on the areas where we can do better.',
      'It means a lot that you took the time to share both the positives and the areas for improvement.',
      'We love hearing what went well, and we really appreciate you pointing out where we can improve!',
      'Thanks for the honest mix of feedback — it really helps us grow and get better.',
      'We\'re happy you saw some positives, and we take the constructive feedback to heart!',
      'Your candid review helps us understand exactly what matters most to our customers.',
    ],
    brief: [
      'We appreciate the balanced feedback.',
      'Thanks for sharing both the positives and areas for improvement.',
      'We value your honest perspective.',
      'Thank you for the constructive feedback.',
      'We hear you on both the good and the areas to improve.',
    ],
  },
};

// ── Keyword-Specific Responses ───────────────────────────────────

const KEYWORD_RESPONSES = {
  food: {
    negative: {
      professional: [
        'We understand that the quality of the food did not meet your expectations, and we have shared this feedback directly with our kitchen team.',
        'Your comments about the food have been forwarded to our chef and kitchen staff for immediate review.',
        'We take food quality concerns very seriously and have addressed this with our culinary team.',
      ],
      warm: [
        'We\'re sorry the food wasn\'t up to par — we\'ve let our kitchen team know so they can do better.',
        'The food should always be top-notch, and we\'re sorry it missed the mark this time. We\'re on it!',
        'We hate hearing the food wasn\'t great — we\'ve talked to our chef about this right away.',
      ],
      brief: [
        'We\'ve addressed the food concerns with our kitchen team.',
        'Your food feedback has been shared with our chef.',
        'We\'re working to improve based on your food comments.',
      ],
    },
    positive: {
      professional: [
        'We are delighted that you enjoyed the food — we will share your kind words with our kitchen team.',
        'It is wonderful to hear that our culinary offerings met your standards.',
        'We take great pride in our food, and your praise means a great deal to our kitchen staff.',
      ],
      warm: [
        'So glad you loved the food! We\'ll pass your compliments straight to the kitchen!',
        'Our chef will be thrilled to hear this — thank you for the kind words about the food!',
        'Nothing makes our kitchen team happier than hearing the food was a hit!',
      ],
      brief: [
        'Glad you enjoyed the food!',
        'We\'ll share your compliments with the kitchen team.',
        'Happy to hear the food hit the spot.',
      ],
    },
  },
  service: {
    negative: {
      professional: [
        'We are sorry that the service you received was not up to the standard we expect from our team.',
        'The service issues you described are being addressed through additional training and coaching.',
        'We hold our staff to high standards, and we regret that they did not meet yours during this visit.',
      ],
      warm: [
        'We\'re really sorry the service let you down — that\'s not who we are, and we\'re addressing it.',
        'Our team should make every visit special, and we\'re sorry they missed the mark for you.',
        'We\'re disappointed to hear the service wasn\'t great — we\'re using this to do better.',
      ],
      brief: [
        'We\'re addressing the service issues you mentioned.',
        'Your service feedback is being used for team improvement.',
        'We\'re taking steps to improve our service.',
      ],
    },
    positive: {
      professional: [
        'We will be sure to recognize the team members who made your experience exceptional.',
        'Your kind words about our staff will be shared with the team — they will be delighted.',
        'We invest in our team and it is rewarding to hear that their dedication shows.',
      ],
      warm: [
        'Our team will be so happy to hear this — they really do care about every customer!',
        'We\'ll make sure to share your kind words with the team — it\'ll make their day!',
        'Our staff works hard to create great experiences, and your recognition means everything!',
      ],
      brief: [
        'We\'ll share your kind words with the team.',
        'Our staff will appreciate the recognition.',
        'Glad our team made your visit special.',
      ],
    },
  },
  wait: {
    negative: {
      professional: [
        'We understand how frustrating long wait times can be, and we are actively working to improve our efficiency.',
        'Wait time is an area we are focused on improving, and your feedback reinforces the urgency.',
        'We apologize for the extended wait — we are reviewing our processes to better manage timing.',
      ],
      warm: [
        'We totally understand how frustrating the wait must have been — nobody likes waiting!',
        'Long waits are no fun, and we\'re sorry you experienced that. We\'re working on it!',
        'We hear you on the wait time — it\'s something we\'re actively trying to improve.',
      ],
      brief: [
        'We apologize for the wait time and are working to improve.',
        'We\'re addressing wait time concerns.',
        'Noted on the wait — we\'re working on it.',
      ],
    },
    positive: {
      professional: [
        'We are pleased to hear that the timing met your expectations.',
        'Efficiency is a priority for us, and we are glad it showed during your visit.',
      ],
      warm: [
        'Glad things moved along smoothly for you!',
        'We try to keep things running on time, and we\'re happy it worked out!',
      ],
      brief: [
        'Glad the timing worked well for you.',
        'Happy we could keep things moving smoothly.',
      ],
    },
  },
  price: {
    negative: {
      professional: [
        'We understand that pricing is an important consideration, and we strive to deliver value that justifies our pricing.',
        'We appreciate your feedback on pricing and will review our offerings to ensure we deliver appropriate value.',
        'We hear your concern regarding pricing and want to ensure our customers always feel they receive fair value.',
      ],
      warm: [
        'We hear you on the pricing — we always want you to feel you\'re getting great value.',
        'Pricing matters, and we want to make sure you feel the experience is worth every penny.',
        'We appreciate the honesty about pricing — we\'re always looking at ways to provide better value.',
      ],
      brief: [
        'We appreciate the pricing feedback.',
        'We strive to deliver strong value at our price point.',
        'Noted — we\'ll review our pricing and value offering.',
      ],
    },
    positive: {
      professional: [
        'We are glad that you found our pricing to be fair and our value proposition strong.',
        'It is great to hear that you feel you received excellent value.',
      ],
      warm: [
        'So glad you felt it was a great value!',
        'We love hearing that — we work hard to keep things fair and valuable!',
      ],
      brief: [
        'Glad you found good value.',
        'Happy our pricing works for you.',
      ],
    },
  },
  cleanliness: {
    negative: {
      professional: [
        'Cleanliness is a top priority, and we apologize for not meeting our own standards during your visit.',
        'We take hygiene concerns very seriously and have addressed this with our maintenance team immediately.',
        'We are sorry about the cleanliness issues — our management has been notified and corrective action has been taken.',
      ],
      warm: [
        'We\'re really sorry about the cleanliness issues — that\'s not acceptable and we\'ve addressed it immediately.',
        'You should never have to worry about cleanliness when visiting us, and we\'re sorry we dropped the ball.',
        'That\'s not the standard we hold ourselves to — we\'ve already taken steps to fix this.',
      ],
      brief: [
        'We\'ve addressed the cleanliness concern immediately.',
        'Cleanliness is a priority — we\'re sorry and have corrected this.',
        'We apologize and have taken corrective action on cleanliness.',
      ],
    },
    positive: {
      professional: [
        'We are pleased that our commitment to cleanliness and hygiene was evident during your visit.',
      ],
      warm: [
        'So glad you noticed — our team works hard to keep everything spotless!',
      ],
      brief: [
        'Glad our cleanliness standards showed.',
      ],
    },
  },
  atmosphere: {
    negative: {
      professional: [
        'We appreciate your feedback about the atmosphere and are considering ways to enhance the overall ambiance.',
        'We understand the environment plays an important role in the overall experience, and we will take your feedback into account.',
      ],
      warm: [
        'We hear you on the atmosphere — it\'s something we\'re looking at improving!',
        'The vibe matters, and we appreciate you letting us know how we can make it better.',
      ],
      brief: [
        'We\'re working on improving the atmosphere.',
        'Noted on the ambiance — we\'re looking into it.',
      ],
    },
    positive: {
      professional: [
        'We are glad that you enjoyed the atmosphere — we put a lot of thought into creating the right environment.',
      ],
      warm: [
        'We love hearing you enjoyed the vibe! We put a lot of love into the atmosphere.',
      ],
      brief: [
        'Happy you enjoyed the atmosphere.',
      ],
    },
  },
  appointment: {
    negative: {
      professional: [
        'We apologize for any scheduling issues you experienced — we are reviewing our booking process.',
        'We understand the importance of timely appointments and are working to improve our scheduling.',
      ],
      warm: [
        'We\'re sorry about the scheduling hiccup — we know your time is valuable!',
        'Appointment issues are frustrating, and we\'re working on a smoother booking experience.',
      ],
      brief: [
        'We apologize for the scheduling issue.',
        'We\'re improving our appointment process.',
      ],
    },
    positive: {
      professional: [
        'We are glad the appointment process was smooth and convenient.',
      ],
      warm: [
        'Happy to hear the scheduling worked out perfectly!',
      ],
      brief: [
        'Glad the appointment went smoothly.',
      ],
    },
  },
  communication: {
    negative: {
      professional: [
        'We apologize for any communication gaps you experienced — clear and timely communication is a priority we are reinforcing.',
        'We understand the frustration of not hearing back promptly, and we are addressing our communication processes.',
      ],
      warm: [
        'We\'re sorry about the communication issues — you deserve to be kept in the loop, and we\'re fixing this.',
        'Not hearing back is frustrating, and we\'re sorry. We\'re improving how we communicate.',
      ],
      brief: [
        'We apologize for the communication issues.',
        'We\'re improving our responsiveness.',
      ],
    },
    positive: {
      professional: [
        'We are glad that our communication met your expectations throughout the process.',
      ],
      warm: [
        'Happy to hear we kept you well informed throughout!',
      ],
      brief: [
        'Glad our communication was clear.',
      ],
    },
  },
  results: {
    negative: {
      professional: [
        'We are sorry that the final results did not meet your expectations, and we would like the opportunity to address this.',
        'The quality of our work is extremely important to us, and we regret that the outcome was unsatisfactory.',
      ],
      warm: [
        'We\'re sorry the results weren\'t what you expected — we want to make it right.',
        'The finished work should have met your expectations, and we\'re sorry it didn\'t.',
      ],
      brief: [
        'We\'re sorry the results fell short.',
        'We\'d like the chance to address the work quality.',
      ],
    },
    positive: {
      professional: [
        'We are delighted that you are pleased with the results of our work.',
        'It is rewarding to hear that the finished work met your expectations.',
      ],
      warm: [
        'So thrilled you\'re happy with how everything turned out!',
        'We love hearing the results exceeded your expectations!',
      ],
      brief: [
        'Glad you\'re happy with the results.',
        'Happy the work met your expectations.',
      ],
    },
  },
  experience: {
    negative: {
      professional: [
        'We regret that your overall experience was not a positive one.',
      ],
      warm: [
        'We\'re sorry your overall experience wasn\'t great — we want every visit to be wonderful.',
      ],
      brief: [
        'We\'re sorry the experience fell short.',
      ],
    },
    positive: {
      professional: [
        'We are thrilled to hear you had such a positive experience overall.',
      ],
      warm: [
        'We love that you had such a great time with us!',
      ],
      brief: [
        'Glad you had a great experience.',
      ],
    },
  },
};

// ── Resolution / CTA Segments ────────────────────────────────────

const RESOLUTIONS = {
  negative: {
    empathetic: {
      professional: [
        'We would welcome the opportunity to make this right. Please do not hesitate to contact us directly at {businessName} so we can discuss this further and find a resolution.',
        'Your satisfaction is our priority. We encourage you to reach out to us directly at {businessName} so we can address your concerns personally.',
        'We want to earn back your trust. Please contact {businessName} directly so our management team can personally address your experience.',
      ],
      warm: [
        'We\'d really love the chance to make this right for you. Please reach out to us at {businessName} — we want to hear from you!',
        'Please give us a chance to turn things around! Reach out to us directly at {businessName} and we\'ll take care of you.',
        'We\'d love to chat with you directly about this — please don\'t hesitate to contact us at {businessName}.',
      ],
      brief: [
        'Please contact us at {businessName} so we can make this right.',
        'We\'d like to resolve this — please reach out to us directly.',
        'Please contact {businessName} directly so we can address this.',
      ],
    },
    solution: {
      professional: [
        'We have already taken steps to address the specific issues you raised. We would appreciate the opportunity to demonstrate our improvements during a future visit.',
        'Based on your feedback, we have implemented changes to prevent this from happening again. We hope you will give us another opportunity to serve you.',
        'We are using your feedback to make concrete improvements. We would value the chance to show you the {businessName} experience at its best.',
      ],
      warm: [
        'We\'ve already started making changes based on your feedback, and we\'d love the chance to show you the difference on a future visit!',
        'Your feedback is genuinely helping us improve. We really hope you\'ll give us another shot — we promise to do better!',
        'We\'re taking this seriously and making real changes. We\'d love for you to come back and see the improvements!',
      ],
      brief: [
        'We\'ve made changes based on your feedback.',
        'Steps have been taken to address these issues.',
        'We\'re using this feedback to improve.',
      ],
    },
    brief_professional: {
      professional: [
        'We will use this feedback to improve. If you would like to discuss this further, please contact us directly at {businessName}.',
        'Your feedback is noted and will be acted upon. We welcome you to contact us directly.',
        'We take this feedback seriously and are taking corrective steps. Please reach out if there is anything else we can do.',
      ],
      warm: [
        'We hear you and we\'re on it! Feel free to reach out to us anytime.',
        'Thanks for helping us get better. Don\'t hesitate to reach out directly!',
        'We\'re working on it! Please feel free to contact us directly if you\'d like to talk more.',
      ],
      brief: [
        'We\'ll use this to improve. Contact us directly if you\'d like to discuss.',
        'Noted and being addressed. Feel free to reach out.',
        'We\'re taking action on this feedback.',
      ],
    },
  },
  positive: {
    grateful: {
      professional: [
        'We look forward to welcoming you back and providing another excellent {visit}. Your continued patronage means a great deal to us.',
        'Reviews like yours motivate our entire team. We look forward to the opportunity to {return}.',
        'Your recommendation means the world to us. We can\'t wait to {return} and exceed your expectations once again.',
      ],
      warm: [
        'We can\'t wait to see you again! Come back anytime — you\'ve made our whole team\'s day!',
        'You\'re always welcome here! We can\'t wait for your next {visit}!',
        'We\'re already looking forward to your next visit — see you soon!',
      ],
      brief: [
        'We look forward to seeing you again!',
        'Can\'t wait to welcome you back.',
        'Hope to see you again soon!',
      ],
    },
    promotional: {
      professional: [
        'We look forward to {return}. We also invite you to explore our other {product}, which we think you would enjoy just as much.',
        'Should you visit again, we recommend trying our other {product}. We are confident you will find them equally impressive.',
        'We would love to {return}. Next time, be sure to ask about our latest {product} — we think you\'ll be pleasantly surprised.',
      ],
      warm: [
        'Next time you visit, you should definitely try our other {product} — we think you\'ll love them even more!',
        'Can\'t wait to see you back! And when you come, ask about our latest {product} — you won\'t be disappointed!',
        'Come back soon! We\'ve got some great {product} we think you\'d really enjoy!',
      ],
      brief: [
        'Come back and try our other {product}!',
        'Next time, ask about our latest offerings.',
        'We\'d love to show you more of what we offer.',
      ],
    },
    brief_warm: {
      professional: [
        'Thank you once again for your kind words. We look forward to your next visit.',
        'We truly appreciate your support and look forward to serving you again.',
        'Thank you for being a valued customer. We look forward to {return}.',
      ],
      warm: [
        'Thanks again for the love — see you next time!',
        'You\'re the best! Can\'t wait to see you again!',
        'Thank you from the bottom of our hearts — see you soon!',
      ],
      brief: [
        'Thanks again — see you next time!',
        'Appreciated! Hope to see you soon.',
        'Thank you! We\'ll see you again soon.',
      ],
    },
  },
  neutral: {
    balanced: {
      professional: [
        'We are committed to continuous improvement and will take your observations into account as we work to enhance your future experiences.',
        'Your feedback provides valuable insight that will help us improve. We hope your next {visit} will earn a higher rating.',
        'We appreciate the constructive perspective and will use it to make meaningful improvements.',
      ],
      warm: [
        'We\'re always working to get better, and your feedback helps us do exactly that! We hope your next {visit} will blow you away!',
        'We take your suggestions to heart and we\'re already looking at how we can improve. Can\'t wait to wow you next time!',
        'This kind of honest feedback is gold for us. We\'re going to work hard to earn that fifth star next time!',
      ],
      brief: [
        'We\'ll work on the areas you mentioned.',
        'Your feedback will help us improve.',
        'We\'re committed to doing better next time.',
      ],
    },
    improvement: {
      professional: [
        'We have noted the specific areas you identified for improvement and are developing action plans to address them. We hope to demonstrate tangible improvements during your next visit.',
        'Your feedback has been shared with the relevant {improve} so we can make targeted improvements.',
        'We take constructive feedback seriously and have already begun reviewing the areas you highlighted.',
      ],
      warm: [
        'We\'ve shared your feedback with our {improve} and they\'re already working on it! We hope you\'ll come back and notice the difference!',
        'Your suggestions are already being put into action — we\'d love for you to come back and see the changes!',
        'This is exactly the kind of feedback that helps us grow. We\'re on it, and we hope you\'ll give us another chance!',
      ],
      brief: [
        'We\'re acting on your specific feedback.',
        'Changes are being made based on your suggestions.',
        'Your input is driving improvements.',
      ],
    },
    invitation: {
      professional: [
        'We would welcome the opportunity to exceed your expectations on your next visit. Please do not hesitate to reach out to us directly at {businessName} with any additional feedback.',
        'We invite you to visit us again soon — we are confident that our ongoing improvements will enhance your next {visit}.',
        'We hope you will give us another chance to deliver an exceptional {visit}. Your feedback makes us better.',
      ],
      warm: [
        'We\'d love to have you back and show you what we\'re all about when we\'re at our best! Come visit us again soon!',
        'Please come back and give us another shot — we promise to make your next {visit} even better!',
        'We really hope you\'ll swing by again — we\'re pretty sure we can win you over next time!',
      ],
      brief: [
        'We\'d love another chance to impress you.',
        'Come back soon — we\'re improving.',
        'Hope to see you again for a better experience.',
      ],
    },
  },
};

// ── Closing Segments ─────────────────────────────────────────────

const CLOSINGS = {
  negative: {
    professional: [
      'We value your feedback and your patronage.',
      'Thank you again for bringing this to our attention.',
      'We appreciate your patience and understanding.',
      'Warm regards, The {businessName} Team',
      'Sincerely, The {businessName} Team',
    ],
    warm: [
      'We appreciate you giving us the chance to improve!',
      'Thank you for helping us be better — it really does matter to us.',
      'We hope to see you again soon. Thank you!',
      'With gratitude, The {businessName} Team',
    ],
    brief: [
      'Thank you.',
      'Best regards, {businessName}',
      'Sincerely, {businessName}',
    ],
  },
  positive: {
    professional: [
      'We value your support and look forward to serving you again.',
      'Warm regards, The {businessName} Team',
      'With appreciation, The {businessName} Team',
      'Sincerely, The {businessName} Team',
    ],
    warm: [
      'You\'re amazing — thank you!',
      'See you next time! - The {businessName} Team',
      'With love, The {businessName} Team',
      'Thanks again! - {businessName}',
    ],
    brief: [
      'Thank you! - {businessName}',
      'See you soon!',
      'Best, {businessName}',
    ],
  },
  neutral: {
    professional: [
      'We value your feedback and continued patronage.',
      'Thank you for the opportunity to improve.',
      'Warm regards, The {businessName} Team',
      'Sincerely, The {businessName} Team',
    ],
    warm: [
      'Thanks for being awesome and sharing your thoughts!',
      'We appreciate you! - The {businessName} Team',
      'See you next time! - {businessName}',
    ],
    brief: [
      'Thank you for your feedback.',
      'Best, {businessName}',
      'Regards, {businessName}',
    ],
  },
};

// ── Utility ──────────────────────────────────────────────────────

function pickSeeded(arr, seed) {
  // Deterministic pick based on seed (so the 3 variations are different)
  const index = Math.abs(seed) % arr.length;
  return arr[index];
}

function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return hash;
}

function interpolate(text, terms, businessName) {
  let result = text;
  for (const [key, value] of Object.entries(terms)) {
    result = result.replace(new RegExp(`\\{${key}\\}`, 'g'), value);
  }
  result = result.replace(/\{businessName\}/g, businessName || 'our team');
  return result;
}

function getSentiment(stars) {
  if (stars <= 2) return 'negative';
  if (stars >= 4) return 'positive';
  return 'neutral';
}

// ── Main Generator ───────────────────────────────────────────────

const VARIATION_MAP = {
  negative: [
    { label: 'Empathetic & Apologetic', key: 'empathetic', letter: 'A' },
    { label: 'Solution-Focused', key: 'solution', letter: 'B' },
    { label: 'Brief & Professional', key: 'brief_professional', letter: 'C' },
  ],
  positive: [
    { label: 'Grateful & Personal', key: 'grateful', letter: 'A' },
    { label: 'Promotional', key: 'promotional', letter: 'B' },
    { label: 'Brief & Warm', key: 'brief_warm', letter: 'C' },
  ],
  neutral: [
    { label: 'Balanced Acknowledgment', key: 'balanced', letter: 'A' },
    { label: 'Improvement-Focused', key: 'improvement', letter: 'B' },
    { label: 'Invitation to Return', key: 'invitation', letter: 'C' },
  ],
};

export function generateResponses({ reviewText, stars, industry, businessName, tone }) {
  const sentiment = getSentiment(stars);
  const terms = getTerms(industry);
  const keywords = extractKeywords(reviewText);
  const variations = VARIATION_MAP[sentiment];
  const bName = businessName || 'our team';
  const reviewHash = hashString(reviewText + stars + tone);

  const results = variations.map((variation, vi) => {
    const seed = reviewHash + vi * 7919; // Use prime offset for variety

    // 1. Opening
    const openingPool = OPENINGS[sentiment][tone];
    const opening = pickSeeded(openingPool, seed);

    // 2. Acknowledgment
    const ackPool = ACKNOWLEDGMENTS[sentiment][tone];
    const acknowledgment = interpolate(pickSeeded(ackPool, seed + 1), terms, bName);

    // 3. Keyword-specific responses (pick up to 2 most relevant)
    const keywordSentiment = sentiment === 'neutral' ?
      (stars === 3 ? 'negative' : 'positive') : sentiment;
    const keywordResponses = [];
    const detectedCategories = Object.keys(keywords);

    // Prioritize the most impactful categories
    const priorityOrder = ['food', 'service', 'wait', 'price', 'cleanliness', 'results', 'communication', 'appointment', 'atmosphere', 'experience', 'location'];
    const sortedCategories = detectedCategories.sort((a, b) => {
      return priorityOrder.indexOf(a) - priorityOrder.indexOf(b);
    });

    for (let i = 0; i < Math.min(2, sortedCategories.length); i++) {
      const cat = sortedCategories[i];
      if (KEYWORD_RESPONSES[cat]) {
        const sentKey = KEYWORD_RESPONSES[cat][keywordSentiment] ? keywordSentiment : (keywordSentiment === 'negative' ? 'negative' : 'positive');
        if (KEYWORD_RESPONSES[cat][sentKey] && KEYWORD_RESPONSES[cat][sentKey][tone]) {
          const pool = KEYWORD_RESPONSES[cat][sentKey][tone];
          keywordResponses.push(interpolate(pickSeeded(pool, seed + i + 2), terms, bName));
        }
      }
    }

    // If no keywords detected, add a generic response about the experience
    if (keywordResponses.length === 0) {
      if (sentiment === 'negative') {
        const genericNeg = {
          professional: 'We are committed to providing an excellent {visit} and clearly fell short.',
          warm: 'We know we can do better, and we will!',
          brief: 'We\'re working to improve.',
        };
        keywordResponses.push(interpolate(genericNeg[tone], terms, bName));
      } else if (sentiment === 'positive') {
        const genericPos = {
          professional: 'We are pleased that our {team} could deliver an excellent {visit}.',
          warm: 'We love hearing that you had such a great time!',
          brief: 'Glad everything went well.',
        };
        keywordResponses.push(interpolate(genericPos[tone], terms, bName));
      } else {
        const genericNeu = {
          professional: 'We are always looking for ways to enhance the {visit} for our customers.',
          warm: 'We\'re always striving to make every {visit} better than the last!',
          brief: 'We\'re always working to improve.',
        };
        keywordResponses.push(interpolate(genericNeu[tone], terms, bName));
      }
    }

    // 4. Resolution/CTA
    const resPool = RESOLUTIONS[sentiment][variation.key][tone];
    const resolution = interpolate(pickSeeded(resPool, seed + 5), terms, bName);

    // 5. Closing
    const closePool = CLOSINGS[sentiment][tone];
    const closing = interpolate(pickSeeded(closePool, seed + 6), terms, bName);

    // Assemble
    const parts = [opening, acknowledgment, ...keywordResponses, resolution, closing];
    const response = parts.join(' ');

    return {
      letter: variation.letter,
      label: variation.label,
      text: response,
      charCount: response.length,
    };
  });

  return results;
}

// ── Platform Tips ────────────────────────────────────────────────

export const PLATFORM_TIPS = {
  google: {
    icon: 'Google',
    tip: 'Including relevant keywords in your response can help your local SEO. Mention your business name, location, and key services naturally.',
  },
  yelp: {
    icon: 'Yelp',
    tip: 'Yelp\'s Community Guidelines prohibit asking the reviewer to change their review. Focus on addressing their experience instead.',
  },
  facebook: {
    icon: 'Facebook',
    tip: 'Facebook recommends responding within 24 hours. Quick responses help your page earn the "Very responsive" badge.',
  },
  tripadvisor: {
    icon: 'TripAdvisor',
    tip: 'TripAdvisor Management Responses are public and permanent. Take a moment to craft a thoughtful reply you\'ll be proud of long-term.',
  },
};

// ── Negative Review Strategy Tips ────────────────────────────────

export const NEGATIVE_REVIEW_TIPS = [
  {
    icon: 'acknowledge',
    text: 'Acknowledge the issue without being defensive',
    detail: 'Start by validating the customer\'s experience. Even if you disagree, their perception is their reality.',
  },
  {
    icon: 'offline',
    text: 'Offer to resolve offline (provide phone/email)',
    detail: 'Move the conversation to a private channel. Include a direct contact method in your response.',
  },
  {
    icon: 'brief',
    text: 'Keep it brief — long responses look argumentative',
    detail: 'Aim for 3-5 sentences. Lengthy responses can come across as defensive or combative.',
  },
  {
    icon: 'blame',
    text: 'Never argue or blame the customer publicly',
    detail: 'Other potential customers are reading your response. Show grace under pressure.',
  },
];
