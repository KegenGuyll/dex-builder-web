import { NextRequest, NextResponse } from "next/server";

type RedirectToLoginOptions = {
  path: string
  publicPaths: string[]
  redirectParamKeyName?: string
}

export function redirectToLogin(
  request: NextRequest,
  options: RedirectToLoginOptions = {
    path: '/login',
    publicPaths: ['/login']
  }
) {
  const redirectKey = options.redirectParamKeyName || 'redirect';

  if (options.publicPaths.some(path => {
    const regex = new RegExp(`^${path.replace('*', '.*')}$`);
    return regex.test(request.nextUrl.pathname);
  })) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = options.path;
  url.search = `${redirectKey}=${request.nextUrl.pathname}${url.search}`;
  return NextResponse.redirect(url);
}