---
layout: page
title: Insights
permalink: /insights/
---

Industry and research perspectives on semiconductor metrology and emerging technologies.

{% for post in site.posts %}
{% if post.insight %}
<h2><a href="{{ post.url | relative_url }}">{{ post.title | escape }}</a></h2>
<p>{{ post.date | date: "%B %Y" }} · {{ post.description | escape }}</p>
{% endif %}
{% endfor %}
