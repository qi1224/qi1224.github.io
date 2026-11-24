---
layout: post
title: "The Evolving Landscape of Semiconductor Metrology: Research Priorities and the Rise of AI/ML"
date: 2026-11-24 09:00:00 +0100
permalink: /insights/semiconductor-metrology-trends/
insight: true
description: "An exploratory analysis of six SPIE conference editions, covering research priorities across major metrology technologies and the growing role of AI/ML."
tags: [Semiconductor Metrology, AI, Technology Trends]
---

*An industry and research analysis based on SPIE Metrology, Inspection, and Process Control, 2021–2026.*

## Executive Summary

As semiconductor manufacturing advances towards increasingly complex 3D architectures, heterogeneous integration, and tighter process tolerances, conventional metrology faces growing challenges in measurement sensitivity, parameter identifiability, throughput, and process compatibility.

This analysis examines two questions: how research priorities differ across major semiconductor metrology technologies, and how the role of artificial intelligence and machine learning (AI/ML) has evolved over six conference editions. The results point to continued development of established measurement platforms, increasing interest in computational and data-driven methods, and demand for solutions tailored to advanced manufacturing.

## 1. Research Priorities Across Major Metrology Technologies

![Stacked paper counts by technique and research focus]({{ '/images/insights/research-focus.png' | relative_url }})

*Figure 1. Research focus across five selected technology categories at SPIE 2026. Exploratory classification of 72 of 132 papers.*

The selected papers were assigned one primary technology and one primary research direction: computational metrology, algorithms, AI/ML, advanced device and packaging applications, multi-technique integration, or equipment and throughput.

### CD-SEM: From Image Acquisition to Intelligent Information Extraction

CD-SEM and related electron-beam methods represent the largest selected category (35 papers). Algorithm development and AI/ML are prominent, including image denoising, contour extraction, profile reconstruction, and synthetic image generation. As features become smaller and more complex, extracting reliable dimensional information from noisy or physically ambiguous images becomes increasingly important. Improving signal quality and extracting more information from existing signals are complementary paths; the latter may improve measurement performance without necessarily increasing acquisition time or electron dose.

### Overlay Metrology: Towards Device-Aware Process Control

Overlay accounts for 21 papers, with algorithms and computational metrology among the major research directions. Advanced lithography, multilayer integration, and wafer bonding introduce complex overlay error distributions. Local deformation and process-induced distortions may require more sophisticated error models, measurement targets, sampling strategies, and correction algorithms. The opportunity is not merely measuring positional errors, but identifying their origins and translating measurements into actionable process corrections.

### OCD: Combining Physical Modeling with Data-Driven Inversion

AI/ML is the primary focus of four of the seven selected OCD-related studies. Optical critical dimension metrology typically solves an inverse problem: the measured response depends simultaneously on geometric and material parameters. Increasing structural complexity introduces parameter correlations, computational costs, limited sensitivity to specific features, and potentially non-unique solutions.

Machine learning can accelerate forward modeling and parameter extraction. However, a faster inverse model does not necessarily produce a more reliable measurement. Optical sensitivity, parameter identifiability, and physical consistency remain essential. Electromagnetic modeling, efficient numerical algorithms, and physically informed machine learning are therefore complementary development directions.

### AFM: Bridging Precision Measurement and High-Volume Manufacturing

Five of the seven selected AFM papers primarily address instrumentation or throughput. AFM provides nanoscale surface and dimensional information, but conventional implementations are often limited by scanning speed and coverage. Parallel scanning and probe technology offer potential routes from high-precision reference measurements towards practical in-line applications.

### XPS: Extending Metrology Beyond Geometry

Two selected papers concern XPS. As device performance increasingly depends on composition, surface chemistry, and interfaces, geometry alone may not provide sufficient process information. XPS offers complementary chemical information for deposition processes, surface treatments, and integrated structures. Measurement speed, spatial applicability, and manufacturing compatibility remain important industrial considerations. A small publication count should not be interpreted as a small industrial opportunity.

## 2. The Rise of AI/ML in Semiconductor Metrology

![Annual AI/ML paper counts and publication share]({{ '/images/insights/ai-ml-trend.png' | relative_url }})

*Figure 2. AI/ML-related publications across six conference editions, covering all metrology and inspection technologies.*

| Year | Total papers | AI/ML papers | Share |
| --- | ---: | ---: | ---: |
| 2021 | 86 | 12 | 14.0% |
| 2022 | 79 | 8 | 10.1% |
| 2023 | 112 | 25 | 22.3% |
| 2024 | 112 | 24 | 21.4% |
| 2025 | 135 | 29 | 21.5% |
| 2026 | 132 | 33 | 25.0% |

Between 2021 and 2026, identifiable AI/ML publications increased from 12 to 33, a 175% increase. Their share increased from approximately 14% to 25%. A noticeable increase occurred in 2023; since then, AI/ML-related studies have accounted for more than one-fifth of annual publications. The increase cannot be explained solely by the growth of the conference.

### From Individual Algorithms to Integrated Measurement Workflows

AI/ML applications can be understood through three overlapping areas:

- **Signal and image processing:** denoising, feature extraction, and defect identification, particularly relevant to electron-beam and optical inspection.
- **Measurement modeling and parameter extraction:** surrogate modeling, inverse problems, structural reconstruction, and simulation acceleration.
- **Integrated metrology and process intelligence:** multimodal data integration, virtual metrology, intelligent sampling, model reliability monitoring, and automated recipe development.

These applications are complementary rather than mutually exclusive. Their industrial value depends on how effectively they address specific measurement limitations.

## 3. Emerging Industrial and Research Opportunities

### Physics-Informed AI and Computational Metrology

Purely data-driven models may perform well within their training domain but encounter difficulties when architectures, materials, or process conditions change. Physical models provide a foundation for understanding sensitivity and constraining possible solutions. Combining physics with machine learning could enable faster simulations, efficient inverse extraction, physically consistent predictions, and improved uncertainty quantification. The key challenge is developing models that remain reliable under realistic manufacturing variations, not simply optimizing accuracy on a fixed dataset.

### Hybrid Metrology and Multi-Technique Integration

No single technology provides optimal sensitivity to every structural and material parameter. Optical metrology offers relatively high throughput but often relies on complex inverse models. CD-SEM provides high-resolution imaging but faces limitations for buried structures. AFM provides surface topography, while XPS provides complementary chemical information. Combining independent measurement constraints can improve parameter identifiability. The research challenge is determining how complementary information reduces uncertainty and resolves otherwise ambiguous inverse problems.

### Metrology for Advanced 3D Devices and Packaging

GAA transistors, CFET architectures, 3D NAND, and advanced packaging introduce buried interfaces, high-aspect-ratio structures, complex material distributions, and multilayer alignment challenges. These cannot always be addressed by improving conventional surface measurements alone. Future development requires closer connections between device architecture, process requirements, measurement physics, and computational reconstruction.

### Throughput and Industrial Deployment

An accurate laboratory method does not automatically become a successful industrial solution. High-volume manufacturing requires throughput, repeatability, reproducibility, equipment matching, and long-term stability. Parallel measurement, intelligent sampling, computational acceleration, and automated workflows are promising routes towards reliable and actionable information within manufacturing constraints.

## 4. Outlook: From Measurement Instruments to Intelligent Metrology Systems

Next-generation metrology can be viewed as an integration of four capabilities:

1. **Measurement physics:** generating signals sensitive to the parameters of interest.
2. **Computational modeling:** connecting measured signals to physical structures.
3. **Data intelligence:** improving information extraction, efficiency, and decision-making.
4. **Process integration:** translating measurements into actionable manufacturing information.

Improved instrumentation provides higher-quality data; physical models establish interpretability; algorithms enable efficient extraction; and process integration determines industrial value. The objective should not simply be to measure smaller features or generate more data, but to extract more reliable physical information from increasingly complex structures under realistic manufacturing constraints. AI/ML can contribute substantially, but its effectiveness depends on signal quality, model validity, and measurement reliability.

## Methodology and Limitations

The technology-specific analysis uses 72 selected papers from the 2026 proceedings, with one primary technology and one primary research direction per paper. The historical analysis covers 656 publications across six conference editions, including 131 identified AI/ML-related papers. Identification relies primarily on explicit references to machine learning, deep learning, neural networks, generative models, and related approaches in titles. Ordinary numerical simulation and conventional optimization are not automatically counted as AI/ML.

This is an exploratory, primarily title-based classification, not a systematic full-text literature review. Technology labels are operational categories: CD-SEM includes related electron-beam methods and OCD includes related optical methods. Papers with overlapping directions may be underrepresented in individual categories, and some AI/ML applications may be missed. Counts indicate conference research activity, not market size, industrial adoption, investment, or technology maturity. The classification and source data are provided for review and correction.

## Data Sources and Supporting Data

SPIE Proceedings — *Metrology, Inspection, and Process Control*: [2021 (11611)](https://www.spiedigitallibrary.org/conference-proceedings-of-spie/11611.toc), [2022 (12053)](https://www.spiedigitallibrary.org/conference-proceedings-of-spie/12053.toc), [2023 (12496)](https://www.spiedigitallibrary.org/conference-proceedings-of-spie/12496.toc), [2024 (12955)](https://www.spiedigitallibrary.org/conference-proceedings-of-spie/12955.toc), [2025 (13426)](https://www.spiedigitallibrary.org/conference-proceedings-of-spie/13426.toc), [2026 (13981)](https://www.spiedigitallibrary.org/conference-proceedings-of-spie/13981.toc).

- [2026 classification counts (CSV)]({{ '/assets/insights/SPIE_2026_Metrology_Sorted_Muted_EN_counts.csv' | relative_url }})
- [2026 paper mapping (CSV)]({{ '/assets/insights/SPIE_2026_Metrology_Custom_Axis_EN_paper_mapping.csv' | relative_url }})
- [Annual AI/ML summary (CSV)]({{ '/assets/insights/SPIE_AI_ML_2021_2026_Summary.csv' | relative_url }})
- [AI/ML paper list (CSV)]({{ '/assets/insights/SPIE_AI_ML_2021_2026_Papers.csv' | relative_url }})
