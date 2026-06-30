import { animationIdeas, bannerSizes, industries } from '../data/bannerBriefOptions.js'

function randomItem(items) {
  return items[Math.floor(Math.random() * items.length)]
}

export default function createBannerBrief() {
  return {
    size: randomItem(bannerSizes),
    industry: randomItem(industries),
    animation: randomItem(animationIdeas),
  }
}
