---
layout: post
title:  Beyond the Baseline: The Necessity of Real-Time Spectral Analysis in In-Situ Testing
date:   2026-03-17 18:00:00 +0100 
image:  atr_data.png
tags:   Talk
---
Excited to share my milestone & an inspiring experience meeting so many brilliant minds!

##  "Real-time" testing is not real
In my doctoral research, I utilize Attenuated Total Reflection (ATR) spectroscopy for in-situ testing of surface physical transformation processes. For a long time, our workflow followed a traditional pattern: real-time acquisition followed by batch post-analysis. However, this "analyze later" approach created a black box-when anomalies appeared in the data weeks later, it was nearly impossible to reconstruct what had actually happened on the lab bench. This not only hindered troubleshooting but also wasted immense time and resources.
## Be an ostrich
Take our experiments as an example. We often observed unexpected "jumps" in peak ratio curves that should have been smooth. We suspected external interference, perhaps a colleague bumping the optical table during a multi-hour run, causing a slight misalignment. Mathematically, such a shift affects the absolute baseline intensity, and due to the wavelength-dependent penetration depth in ATR, it results in skewed relative peak ratios. Yet, we could never be certain. Monitoring hundreds of dense, overlapping spectral lines on a screen makes it nearly impossible to spot these subtle, lethal deviations that compromise the high sensitivity of ATR technology.
![]({{ site.baseurl }}/images/atr_raw.png)
I must candidly admit: we had been playing the "ostrich" by avoiding this issue. We simply discarded suspicious data sets and hoped for the best, blaming "platform instability" without proof. The reason for this inertia was simple: we were tethered to supplier-provided software (Omnic Macro Basic), which lacked customizable analysis features. My limited programming skills at the time provided little incentive to optimize the workflow. After all, if you repeat an experiment enough times, you eventually get a "clean" result.
## Don't be an ostrich
But I decided to fix the weakest link in the chain. The process was surprisingly straightforward—as most things are once you start. I implemented a system for real-time spectral analysis and statistical monitoring, which automatically logs anomalies and sends notifications. While the mysterious "jumps" persisted, this automated monitor allowed us to definitively rule out "table bumps" as the cause. More importantly, it allowed us to terminate compromised in-situ experiments immediately, saving days of useless testing.
## Path is shorter than thought
The necessity of real-time processing in in-situ spectroscopy cannot be overstated. It is not difficult, yet it is consistently undervalued. The "slowness" of adoption in our field often stems from a lack of software development experience or a limited cognitive horizon regarding what is possible.
Today, with the advent of AI-assisted development tools like Vibe Coding and Claude Code, the barrier to entry has been lowered to near zero. For traditional chemical characterization and research, embracing AI-assisted coding isn't just an advantage; it's a necessity.
