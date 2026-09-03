import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/services/supabase';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const agencyId = searchParams.get('agencyId');

    if (!agencyId) {
      return NextResponse.json({ error: 'Missing agencyId' }, { status: 400 });
    }

    const { data: agency, error } = await supabaseAdmin
      .from('agencies')
      .select('id, name, logo_url, subscription_status, subscription_end_date, max_users')
      .eq('id', agencyId)
      .single();

    if (error || !agency) {
      return NextResponse.json({ error: 'Agency not found' }, { status: 404 });
    }

    return NextResponse.json({ 
      agency: {
        ...agency,
        active_agents_count: 1
      }
    });

  } catch (error) {
    console.error('[Agency Details API]', error);
    return NextResponse.json({ error: 'Internal Error' }, { status: 500 });
  }
}
