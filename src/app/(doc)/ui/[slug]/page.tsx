// "use client";

// import { Button } from "@/components/ui/button";
// import { DocsCopyPage } from "@/feature/doc/shared/components/docs-copy-page";
// // import { CodeBlock } from "@/components/code/code-block";
// import { Copy, Eye, Layers } from "lucide-react";
// import { useInView } from "motion/react";
// import Link from "next/link";
// import { useRef, useState, type ReactNode } from "react";

// // -----------------------------------------------------------------------------
// // Page content: edit these arrays to update the navigation and method lists.
// // -----------------------------------------------------------------------------

// type NavigationItem = {
//   label: string;
//   href: string;
//   active?: boolean;
// };

// const navigationItems: NavigationItem[] = [
//   {
//     label: "Gravity Mouse Trail",
//     href: "#anchor1",
//     active: true,
//   },
//   { label: "HTML Structure", href: "#anchor1" },
//   { label: "Some CSS", href: "#anchor2" },
//   { label: "Starting the animation", href: "#anchor3" },
//   { label: "Triggering image creation", href: "#anchor4" },
//   { label: "Inside createMedia()", href: "#anchor5" },
//   { label: "Going further", href: "#anchor6" },
//   { label: "Final code", href: "#anchor7" },
// ];

// // -----------------------------------------------------------------------------
// // Reusable layout components
// // -----------------------------------------------------------------------------

// type PageLayoutProps = {
//   leftSidebar: ReactNode;
//   rightSidebar: ReactNode;
//   children: ReactNode;
// };

// function PageLayout({ leftSidebar, rightSidebar, children }: PageLayoutProps) {
//   return (
//     <div className="min-h-screen">
//       {/* Main Grid: 15px gutter, 25px outer margin */}
//       <div className="flex flex-col lg:flex-row gap-[15px] px-[25px] pb-10 max-w-[1600px] mx-auto">
//         {leftSidebar}
//         <main className="flex-1 lg:max-w-[610px] mx-auto w-full mt-[150px]">
//           {children}
//         </main>
//         {rightSidebar}
//       </div>
//     </div>
//   );
// }

// function TableOfContents() {
//   return (
//     <aside className="hidden lg:block w-[250px] shrink-0">
//       <div className="sticky top-10 flex flex-col gap-6 justify-end h-[calc(100vh-80px)]">
//         {/* Replace this placeholder with the real logo when available. */}
//         <div className="size-8 bg-neutral-200/70 rounded-md flex items-center justify-center text-xs">
//           <Layers size={16} />
//         </div>

//         <nav aria-label="Table of contents">
//           <ul className="flex flex-col gap-3 text-sm text-[#999]">
//             {navigationItems.map((item) => (
//               <li key={`${item.href}-${item.label}`}>
//                 <a
//                   href={item.href}
//                   className={
//                     item.active
//                       ? "text-black hover:text-black/80 transition-colors"
//                       : "hover:text-black/80 transition-colors"
//                   }
//                 >
//                   {item.label}
//                 </a>
//               </li>
//             ))}
//           </ul>
//         </nav>
//       </div>
//     </aside>
//   );
// }

// type HeroSectionProps = {
//   title: string;
//   description: string;
//   videoSrc: string;
// };

// function HeroSection({ title, description, videoSrc }: HeroSectionProps) {
//   const textRef = useRef<HTMLHeadingElement>(null);
//   const isInView = useInView(textRef, {
//     once: false,
//     amount: 0.5,
//   });

//   return (
//     <section className="relative flex flex-col gap-4 mb-12">
//       <div className="flex flex-row gap-2 justify-between">
//         <h1
//           ref={textRef}
//           className={`leading-[1.15] font-heading text-3xl lg:text-4xl font-medium tracking-tight chroma-text chroma-text-animate ${isInView ? "chroma-text-animate-once" : ""
//             }`}
//         >
//           {title}
//         </h1>
//         <div>
//           <DocsCopyPage page="" url="" />
//         </div>
//       </div>


//       <p className="text-[#999] text-sm md:text-base max-w-md">{description}</p>

//       <div className="h-full w-full p-2 rounded-2xl bg-neutral-200/70">
//         <video
//           src={videoSrc}
//           aria-label="preview"
//           muted
//           loop
//           playsInline
//           autoPlay
//           className="h-full w-full rounded-lg aspect-video"
//         />
//       </div>
//     </section>
//   );
// }

// type ArticleSectionProps = {
//   id: string;
//   title: string;
//   description: string;
//   children: ReactNode;
// };

// function ArticleSection({
//   id,
//   title,
//   description,
//   children,
// }: ArticleSectionProps) {
//   return (
//     <section aria-labelledby={id}>
//       <h2 className="text-xl font-medium mb-4 mt-12" id={id}>
//         {title}
//       </h2>
//       <p className="text-[#999] mb-6 leading-relaxed">{description}</p>
//       {children}
//     </section>
//   );
// }

// // -----------------------------------------------------------------------------
// // Reusable right sidebar components
// // -----------------------------------------------------------------------------


// type ActionButtonVariant = "dark" | "light" | "icon";

// type ActionButtonProps = {
//   variant: ActionButtonVariant;
//   label?: string;
//   icon: ReactNode;
//   trailing?: ReactNode;
//   ariaLabel?: string;
// };

// const actionButtonClasses: Record<ActionButtonVariant, string> = {
//   dark: "w-full bg-[#232323] hover:bg-[#323232] text-white py-4 rounded-xl flex items-center justify-between px-6 transition-colors border border-[#323232]",
//   light:
//     "flex-1 bg-white hover:bg-gray-200 text-black py-4 rounded-xl flex items-center justify-between px-6 transition-colors font-medium",
//   icon: "w-14 bg-[#232323] border border-[#323232] rounded-xl flex items-center justify-center hover:bg-[#323232] transition-colors",
// };


// function SidebarActions() {
//   return (
//     <div className=" flex flex-col gap-3">
//       <Button asChild className="bg-neutral-200/70 hover:bg-neutral-200/80 text-black">
//         <Link href="/preview/ui/apple-folder" target="_blank" rel="noopener noreferrer">
//           <Eye />
//           Live Preview
//         </Link>
//       </Button>
//     </div>
//   );
// }

// function MethodsSidebar() {
//   return (
//     <aside className="hidden xl:flex w-[250px] shrink-0 flex-col justify-start">
//       {/* top (150px) + bottom gap (20px) = fits exactly inside the viewport */}
//       <div className="sticky top-[150px] flex flex-col h-[calc(100vh-170px)]">
//         <div
//           id="Resource-details"
//           className="flex justify-between items-center mb-3 shrink-0"
//         >
//           <span className="text-sm">Resource details</span>
//         </div>

//         {/* flex-1 + min-h-0: takes all leftover space and can shrink/scroll */}
//         <div className="flex-1 min-h-0 overflow-y-auto pr-2 custom-scrollbar">
//           <div className="border-b-2 border-border pb-4 mb-4">
//             {/* Resource information date */}
//             <div className="flex items-center justify-between">
//               <span className="text-[12px] text-muted-foreground">Published</span>
//               <span className="text-[12px] text-muted-foreground font-medium">August 5, 2026</span>
//             </div>
//             {/* the type of the resource like UI / Component / block / etc */}
//             <div className="flex items-center justify-between">
//               <span className="text-[12px] text-muted-foreground">Category</span>
//               <span className="text-[12px] text-muted-foreground font-medium">UI</span>
//             </div>
//           </div>
//           {/* resource tags */}
//           <div>
//             <div className="flex flex-wrap gap-1 mt-2">
//               <span className="rounded-sm dark:bg-muted bg-neutral-200/70 px-1.5 py-0.5 text-[12px] font-archivo font-medium capitalize text-muted-foreground">Mouse Trail</span>
//               <span className="rounded-sm dark:bg-muted bg-neutral-200/70 px-1.5 py-0.5 text-[12px] font-archivo font-medium capitalize text-muted-foreground">Animation</span>
//               <span className="rounded-sm dark:bg-muted bg-neutral-200/70 px-1.5 py-0.5 text-[12px] font-archivo font-medium capitalize text-muted-foreground">GSAP</span>
//             </div>
//           </div>
//         </div>

//         {/* shrink-0 keeps the buttons from being squeezed */}
//         <div className="shrink-0">
//           <SidebarActions />
//         </div>
//       </div>
//     </aside>
//   );
// }

// // -----------------------------------------------------------------------------
// // Page
// // -----------------------------------------------------------------------------

// export default function Page() {
//   return (
//     <>
//       <PageLayout
//         leftSidebar={<TableOfContents />}
//         rightSidebar={<MethodsSidebar />}
//       >
//         <HeroSection
//           videoSrc="/data/fixel-ui-navbar-01.mp4"
//           title="Gravity Mouse Trail"
//           description="This mouse trail has a unique twist. As the user moves the cursor, images are created, fall to the bottom of the screen, bounce, and eventually fade away. Let's see how it works!"
//         />
//         <ArticleSection
//           id="anchor1"
//           title="HTML Structure"
//           description="The structure here is quite simple. We will simply call the set of images we want for our effect:"
//         >
//           {/* <CodeBlock showCopyButton language="html"  code={codeSnippets.html} /> */}
//           code block is here
//         </ArticleSection>

//         <ArticleSection
//           id="anchor2"
//           title="Some CSS"
//           description="Now, I will hide these images using a bit of CSS."
//         >
//           {/* <CodeBlock code={codeSnippets.html} /> */}
//           code block is here
//         </ArticleSection>
//       </PageLayout>
//     </>
//   );
// }



"use client";

import { CodeBlockCommand } from "@/components/code/code-block-command";
import { Button } from "@/components/ui/button";
import { DocsCopyPage } from "@/feature/doc/shared/components/docs-copy-page";
// import { CodeBlock } from "@/components/code/code-block";
import { Copy, Eye, Layers } from "lucide-react";
import { useInView } from "motion/react";
import Link from "next/link";
import { useRef, useState, type ReactNode } from "react";

// -----------------------------------------------------------------------------
// Page content: edit these arrays to update the navigation and method lists.
// -----------------------------------------------------------------------------

type NavigationItem = {
  label: string;
  href: string;
  active?: boolean;
};

const navigationItems: NavigationItem[] = [
  {
    label: "Gravity Mouse Trail",
    href: "#anchor1",
    active: true,
  },
  { label: "HTML Structure", href: "#anchor1" },
  { label: "Some CSS", href: "#anchor2" },
  { label: "Starting the animation", href: "#anchor3" },
  { label: "Triggering image creation", href: "#anchor4" },
  { label: "Inside createMedia()", href: "#anchor5" },
  { label: "Going further", href: "#anchor6" },
  { label: "Final code", href: "#anchor7" },
];

// -----------------------------------------------------------------------------
// Reusable layout components
// -----------------------------------------------------------------------------

type PageLayoutProps = {
  leftSidebar: ReactNode;
  rightSidebar: ReactNode;
  children: ReactNode;
};

function PageLayout({
  leftSidebar,
  rightSidebar,
  children,
}: PageLayoutProps) {
  return (
    <div className="min-h-screen">
      <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-[15px] px-4 pb-10 sm:px-[25px] lg:flex-row lg:flex-wrap xl:flex-nowrap">
        {leftSidebar}

        <main className="mx-auto mt-8 w-full min-w-0 flex-1 sm:mt-10 lg:mt-[150px] lg:max-w-[610px]">
          {children}
        </main>

        {rightSidebar}
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Table of contents
// -----------------------------------------------------------------------------

function TableOfContents() {
  return (
    <aside className="w-full shrink-0 lg:w-[250px]">
      <div className="flex flex-col gap-4 lg:sticky lg:top-10 lg:h-[calc(100vh-80px)] lg:justify-end lg:gap-6">
        {/* Replace this placeholder with the real logo when available. */}
        <div className="flex size-8 items-center justify-center rounded-md bg-neutral-200/70 text-xs">
          <Layers size={16} />
        </div>

        <nav aria-label="Table of contents">
          <ul className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm text-[#999] sm:grid-cols-3 lg:flex lg:flex-col lg:gap-3">
            {navigationItems.map((item) => (
              <li key={`${item.href}-${item.label}`} className="min-w-0">
                <a
                  href={item.href}
                  className={`block break-words transition-colors ${item.active
                      ? "text-black hover:text-black/80"
                      : "hover:text-black/80"
                    }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
}

// -----------------------------------------------------------------------------
// Hero section
// -----------------------------------------------------------------------------

type HeroSectionProps = {
  title: string;
  description: string;
  videoSrc: string;
};

function HeroSection({
  title,
  description,
  videoSrc,
}: HeroSectionProps) {
  const textRef = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(textRef, {
    once: false,
    amount: 0.5,
  });

  return (
    <section className="relative mb-12 flex flex-col gap-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
        <h1
          ref={textRef}
          className={`font-heading text-3xl font-medium leading-[1.15] tracking-tight chroma-text chroma-text-animate lg:text-4xl ${isInView ? "chroma-text-animate-once" : ""
            }`}
        >
          {title}
        </h1>

        <div className="self-end sm:self-auto">
          <DocsCopyPage page="" url="" />
        </div>
      </div>

      <p className="max-w-md text-sm text-[#999] md:text-base">
        {description}
      </p>

      <div className="h-full w-full rounded-2xl bg-neutral-200/70 p-2">
        <video
          src={videoSrc}
          aria-label="preview"
          muted
          loop
          playsInline
          autoPlay
          className="aspect-video h-full w-full rounded-lg"
        />
      </div>
    </section>
  );
}

// -----------------------------------------------------------------------------
// Article sections
// -----------------------------------------------------------------------------

type ArticleSectionProps = {
  id: string;
  title: string;
  description: string;
  children: ReactNode;
};

function ArticleSection({
  id,
  title,
  description,
  children,
}: ArticleSectionProps) {
  return (
    <section aria-labelledby={id} className="min-w-0">
      <h2 className="mb-4 mt-12 text-xl font-medium" id={id}>
        {title}
      </h2>

      <p className="mb-6 leading-relaxed text-[#999]">
        {description}
      </p>

      {children}
    </section>
  );
}

// -----------------------------------------------------------------------------
// Reusable right sidebar components
// -----------------------------------------------------------------------------

type ActionButtonVariant = "dark" | "light" | "icon";

type ActionButtonProps = {
  variant: ActionButtonVariant;
  label?: string;
  icon: ReactNode;
  trailing?: ReactNode;
  ariaLabel?: string;
};

const actionButtonClasses: Record<ActionButtonVariant, string> = {
  dark: "w-full bg-[#232323] hover:bg-[#323232] text-white py-4 rounded-xl flex items-center justify-between px-6 transition-colors border border-[#323232]",
  light:
    "flex-1 bg-white hover:bg-gray-200 text-black py-4 rounded-xl flex items-center justify-between px-6 transition-colors font-medium",
  icon: "w-14 bg-[#232323] border border-[#323232] rounded-xl flex items-center justify-center hover:bg-[#323232] transition-colors",
};

function SidebarActions() {
  return (
    <div className="flex flex-col gap-3">
      <Button
        asChild
        className="bg-neutral-200/70 text-black hover:bg-neutral-200/80"
      >
        <Link
          href="/preview/ui/apple-folder"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Eye />
          Live Preview
        </Link>
      </Button>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Resource details
// -----------------------------------------------------------------------------

function MethodsSidebar() {
  return (
    <aside className="flex w-full shrink-0 flex-col lg:basis-full xl:w-[250px] xl:basis-auto">
      <div className="flex flex-col xl:sticky xl:top-[150px] xl:h-[calc(100vh-170px)]">
        <div
          id="Resource-details"
          className="mb-3 flex shrink-0 items-center justify-between"
        >
          <span className="text-sm">Resource details</span>
        </div>

        <div className="min-h-0 flex-1 overflow-visible pr-0 custom-scrollbar xl:overflow-y-auto xl:pr-2">
          <div className="mb-4 border-b-2 border-border pb-4">
            {/* Resource information date */}
            <div className="flex items-center justify-between gap-3">
              <span className="text-[12px] text-muted-foreground">
                Published
              </span>
              <span className="text-right text-[12px] font-medium text-muted-foreground">
                August 5, 2026
              </span>
            </div>

            {/* Resource category */}
            <div className="flex items-center justify-between gap-3">
              <span className="text-[12px] text-muted-foreground">
                Category
              </span>
              <span className="text-right text-[12px] font-medium text-muted-foreground">
                UI
              </span>
            </div>
          </div>

          {/* Resource tags */}
          <div>
            <div className="mt-2 flex flex-wrap gap-1">
              <span className="rounded-sm bg-neutral-200/70 px-1.5 py-0.5 text-[12px] font-archivo font-medium capitalize text-muted-foreground dark:bg-muted">
                Mouse Trail
              </span>

              <span className="rounded-sm bg-neutral-200/70 px-1.5 py-0.5 text-[12px] font-archivo font-medium capitalize text-muted-foreground dark:bg-muted">
                Animation
              </span>

              <span className="rounded-sm bg-neutral-200/70 px-1.5 py-0.5 text-[12px] font-archivo font-medium capitalize text-muted-foreground dark:bg-muted">
                GSAP
              </span>
            </div>
          </div>
        </div>

        {/* Keep the action buttons from shrinking. */}
        <div className="mt-5 shrink-0 xl:mt-0">
          <SidebarActions />
        </div>
      </div>
    </aside>
  );
}

// -----------------------------------------------------------------------------
// Page
// -----------------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <PageLayout
        leftSidebar={<TableOfContents />}
        rightSidebar={<MethodsSidebar />}
      >
        <HeroSection
          videoSrc="/data/fixel-ui-navbar-01.mp4"
          title="Gravity Mouse Trail"
          description="This mouse trail has a unique twist. As the user moves the cursor, images are created, fall to the bottom of the screen, bounce, and eventually fade away. Let's see how it works!"
        />

        <ArticleSection
          id="anchor1"
          title="HTML Structure"
          description="The structure here is quite simple. We will simply call the set of images we want for our effect:"
        >
          {/* <CodeBlock showCopyButton language="html" code={codeSnippets.html} /> */}
          <CodeBlockCommand __npm__="npm install" __yarn__="yarn add" __pnpm__="pnpm add" __bun__="bun add" />
        </ArticleSection>

        <ArticleSection
          id="anchor2"
          title="Some CSS"
          description="Now, I will hide these images using a bit of CSS."
        >
          {/* <CodeBlock code={codeSnippets.html} /> */}
          code block is here
        </ArticleSection>
      </PageLayout>
    </>
  );
}
