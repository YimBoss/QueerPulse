'use client'
import React, { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'

export default function ExoAd({ keyName }: { keyName: 'exo_top' | 'exo_bottom' }) {
  const supabase = React.useRef(createClient()).current
  const [html, setHtml] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    const load = async () => {
      try {
        const { data, error } = await supabase.from('site_settings').select('value').eq('key', keyName).maybeSingle()
        if (error) {
          console.warn('Error loading ad tag', error)
          return
        }
        if (!mounted) return
        setHtml((data as { value?: string } | null)?.value ?? null)
      } catch (e) {
        console.error('ExoAd load error', e)
      }
    }
    load()
    return () => { mounted = false }
  }, [keyName, supabase])

  if (!html) return <div className="ad-placeholder">Publicidad</div>

  // Render raw HTML / JS from DB. ADMIN must ensure tag is valid and complies with laws.
  return <div className="exo-ad" dangerouslySetInnerHTML={{ __html: html }} />
}