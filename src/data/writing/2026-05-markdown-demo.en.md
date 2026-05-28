## What's new

All blog posts and project pages now support Markdown files directly. Write frontmatter at the top, and the article content below `---`.

## Block types

### Code

```ts
interface Post {
  slug: string;
  body?: ContentBlock[];
}
```

### Quote

> What is simple to write is usually simple to read.
> — unknown

### Table

| Block | Source | Component |
|-------|--------|-----------|
| `heading` | `## text` | `<h2>`–`<h4>` |
| `list` | `- item` | `<ul>` / `<ol>` |
| `table` | `\| col \|` | SimpleTable |
| `callout` | `:::callout` | CardDouble |
| `details` | `:::details` | Accordion |

---

### Callout

:::callout[Tip]
Use `:::callout[Title]` to highlight important information with a double-border frame.
:::

### Accordion

:::details[Show more]
This is only shown when the user expands the section. Great for extra information not everyone needs.
:::

## Inline formatting

Paragraphs support **bold text**, _italics_, `inline code`, and [links](https://nagorny.no).
