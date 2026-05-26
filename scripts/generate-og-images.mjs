import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { createHash } from 'node:crypto'
import React from 'react'
import { ImageResponse } from '@vercel/og'
import matter from 'gray-matter'

const POSTS_DIR = 'content/posts'
const OG_DIR = 'public/blog/og'
const CACHE_FILE = join(OG_DIR, '.cache.json')
const FORCE = process.argv.includes('--force')

mkdirSync(OG_DIR, { recursive: true })

const cache = existsSync(CACHE_FILE)
  ? JSON.parse(readFileSync(CACHE_FILE, 'utf-8'))
  : {}

function hashPost(fm) {
  const input = [
    fm.title ?? '',
    fm.date ?? '',
    (fm.tags ?? []).join(','),
    fm.ogImage ?? '',
  ].join('|')
  return createHash('sha256').update(input).digest('hex')
}

function buildElement(title, date, tags) {
  const { createElement: h } = React
  return h(
    'div',
    {
      style: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        width: '100%',
        height: '100%',
        padding: '60px 72px',
        backgroundColor: '#0a0a0b',
        fontFamily: 'sans-serif',
      },
    },
    h('div', {
      style: {
        fontSize: 14,
        color: 'rgba(99,102,241,0.9)',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        marginBottom: 20,
      },
    }, 'lucholabs.dev'),
    h('div', {
      style: {
        fontSize: 60,
        fontWeight: 700,
        color: '#ffffff',
        lineHeight: 1.1,
        letterSpacing: '-0.03em',
        maxWidth: 900,
        marginBottom: 32,
      },
    }, title),
    h('div', {
      style: { display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap' },
    },
      ...(tags ?? []).slice(0, 4).map(tag =>
        h('div', {
          key: tag,
          style: {
            fontSize: 13,
            color: 'rgba(255,255,255,0.45)',
            background: 'rgba(255,255,255,0.07)',
            padding: '4px 12px',
            borderRadius: 20,
          },
        }, tag)
      )
    ),
    h('div', {
      style: { fontSize: 13, color: 'rgba(255,255,255,0.25)' },
    }, date ?? ''),
  )
}

const files = readdirSync(POSTS_DIR).filter(f => f.endsWith('.mdx') && !f.startsWith('_'))

let cached = 0
let regenerated = 0
let created = 0

for (const file of files) {
  const raw = readFileSync(join(POSTS_DIR, file), 'utf-8')
  const { data: fm } = matter(raw)

  if (fm.draft === true) continue

  const slug = fm.slug ?? file.replace(/\.mdx$/, '')
  const outPath = join(OG_DIR, `${slug}.png`)
  const hash = hashPost(fm)

  const exists = existsSync(outPath)
  const cacheHit = !FORCE && exists && cache[slug] === hash

  if (cacheHit) {
    cached++
    continue
  }

  const wasNew = !exists

  const element = buildElement(fm.title, fm.date, fm.tags)
  const response = new ImageResponse(element, { width: 1200, height: 630 })
  const buffer = Buffer.from(await response.arrayBuffer())
  writeFileSync(outPath, buffer)

  cache[slug] = hash

  if (wasNew) created++
  else regenerated++
}

writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2), 'utf-8')
console.log(`og-images: ${cached} cached, ${regenerated} regenerated, ${created} new`)
