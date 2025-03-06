import NextLink from "next/link";
import { useRouter } from "next/router";

export const Link = ({ children, skipLocaleHandling, target, ...rest }) => {
  const router = useRouter();
  const locale = rest.locale || router.query.locale || "";

  let href = rest.href || router.asPath;
  if (href.indexOf("http") === 0) skipLocaleHandling = true;
  if (locale && !skipLocaleHandling) {
    href = href
      ? `/${locale}${href}`
      : router.pathname.replace("[locale]", locale);
  }

  return (
    <NextLink href={href} target={target} className={rest.className}>
      {children}
    </NextLink>
  );
};
