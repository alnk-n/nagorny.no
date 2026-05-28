---
slug: 2026-05-markdown-demo
date: 2026-05-28
title: Siden støtter nå Markdown-filer
title_en: The site now supports Markdown files
tags: [webdev, meta, markdown]
lede: Jeg kan nå skrive innlegg som vanlige .md-filer med frontmatter i stedet for å bruke en JSON-boilerplate.
lede_en: I can now write posts as plain .md files with frontmatter instead of using a JSON boilerplate.
readTime: 4
---

## Hva er nytt

Alle blogginnlegg og prosjektsider støtter nå Markdown-filer direkte. Skriv frontmatter øverst, og selve artikkelen under `---`.

## Blokktyper

### Kode

```ts
interface Post {
  slug: string;
  body?: ContentBlock[];
}
```

### Sitat

> Det som er enkelt å skrive er som regel enkelt å lese.
> — ukjent

### Tabell

| Blokk     | Kilde        | Komponent       |
| --------- | ------------ | --------------- |
| `heading` | `## tekst`   | `<h2>`–`<h4>`   |
| `list`    | `- item`     | `<ul>` / `<ol>` |
| `table`   | `\| col \|`  | SimpleTable     |
| `callout` | `:::callout` | CardDouble      |
| `details` | `:::details` | Accordion       |

---

### Callout

:::callout[Tips]
Bruk `:::callout[Tittel]` for å fremheve viktig informasjon med en dobbel-ramme.
:::

### Trekkspill

:::details[Vis mer]
Dette vises kun når brukeren åpner seksjonen. Bra for ekstra informasjon som ikke alle trenger.
:::

## Inline-formatering

Avsnitt støtter **fet tekst**, _kursiv_, `inline kode`, og [lenker](https://nagorny.no).
