import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getRouteRegex } from "next/dist/shared/lib/router/utils/route-regex";
import { getClientBuildManifest } from "next/dist/client/route-loader";
import { parseRelativeUrl } from "next/dist/shared/lib/router/utils/parse-relative-url";
import { isDynamicRoute } from "next/dist/shared/lib/router/utils/is-dynamic";
import { removeTrailingSlash } from "next/dist/shared/lib/router/utils/remove-trailing-slash";
import { Link } from "@/components/Link";

async function getPageList() {
  if (process.env.NODE_ENV === "production") {
    const { sortedPages } = await getClientBuildManifest();
    return sortedPages;
  } else {
    if (typeof window !== "undefined" && window.__BUILD_MANIFEST?.sortedPages) {
      console.log(window.__BUILD_MANIFEST.sortedPages);
      return window.__BUILD_MANIFEST.sortedPages;
    }
  }
  return [];
}

async function getDoesLocationMatchPage(location) {
  const pages = await getPageList();

  let parsed = parseRelativeUrl(location);
  let { pathname } = parsed;
  return pathMatchesPage(pathname, pages);
}

function pathMatchesPage(pathname, pages) {
  const cleanPathname = removeTrailingSlash(pathname);

  if (pages.includes(cleanPathname)) {
    return true;
  }

  const page = pages.find(
    (page) => isDynamicRoute(page) && getRouteRegex(page).re.test(cleanPathname)
  );

  if (page) {
    return true;
  }
  return false;
}

/**
 * If both asPath and pathname are equal then it means that we
 * are on the correct route it still doesnt exist
 */
function doesNeedsProcessing(router) {
  const status = router.pathname !== router.asPath;
  console.log("Does Needs Processing", router.asPath, status);
  return status;
}

const Custom404 = () => {
  const router = useRouter();

  const [isNotFound, setIsNotFound] = useState(false);

  const processLocationAndRedirect = async (router) => {
    if (doesNeedsProcessing(router)) {
      const targetIsValidPage = await getDoesLocationMatchPage(router.asPath);
      if (targetIsValidPage) {
        await router.replace(router.asPath);
        return;
      }
    }
    setIsNotFound(true);
  };

  useEffect(() => {
    if (router.isReady) {
      processLocationAndRedirect(router);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  if (!isNotFound) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center">
      <div className="flex flex-col gap-10">
        <h1>Page Not Found</h1>
        <Link href="/">
          <button>Home Page</button>
        </Link>
      </div>
    </div>
  );
};

export default Custom404;
