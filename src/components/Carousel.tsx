import type { ReactNode } from "react";
import React, { useEffect, useRef, useState, useMemo } from "react";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import styles from "./Carousel.module.css";

const GAP = 20;

function Carousel({
  itemWidth,
  children,
  classes = {},
}: {
  itemWidth: number;
  children: ReactNode;
  classes?: {
    carouselContent?: string;
  };
}) {
  const [activePage, setActivePage] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(1);
  const [containerHeight, setContainerHeight] = useState(itemWidth || 300); // start with a guess
  const containerRef = useRef<HTMLDivElement>(null);
  const hasMore = useMemo(
    () => activePage + slidesToShow - 1 < React.Children.count(children),
    [activePage, slidesToShow, children]
  );

  useEffect(() => {
    // update slidesToShow on resize if slidesToShow
    const onResize = () => {
      if (!containerRef.current || !itemWidth) {
        return;
      }
      const width = containerRef.current.clientWidth;
      const newSlidesToShow = Math.floor(width / itemWidth);
      setSlidesToShow(newSlidesToShow);
      setContainerHeight(containerRef.current.clientHeight);
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [itemWidth]);

  const next = () => {
    if (hasMore) {
      setActivePage(activePage + 1);
    }
  };

  const previous = () => {
    if (activePage > 0) {
      setActivePage(activePage - 1);
    }
  };

  // const isMobile = useIsMobile();
  // if (isMobile) {
  //   return (
  //     <div className={styles.container} style={{ height: containerHeight }}>
  //       <div className={styles.carouselWrapper} ref={containerRef}>
  //         <div
  //           className={clsx(
  //             styles.carousel,
  //             hasMore && activePage > 0
  //               ? styles.carouselHasHothArrows
  //               : {
  //                   [styles.carouselHasRightArrow]: hasMore,
  //                   [styles.carouselHasLeftArrow]: activePage > 0,
  //                 }
  //           )}
  //         >
  //           <div
  //             className={clsx(styles.carouselContent, classes.carouselContent)}
  //           >
  //             {children}
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className={styles.container} style={{ height: containerHeight }}>
      <div className={styles.carouselWrapper} ref={containerRef}>
        <div
          className={clsx(
            styles.carousel,
            hasMore && activePage > 0
              ? styles.carouselHasHothArrows
              : {
                  // @ts-expect-error todo
                  [styles.carouselHasRightArrow]: hasMore,
                  // @ts-expect-error todo
                  [styles.carouselHasLeftArrow]: activePage > 0,
                }
          )}
        >
          <div
            className={styles.carouselContent}
            style={{
              transform: itemWidth
                ? `translateX(-${
                    activePage === 0
                      ? 0
                      : itemWidth * activePage +
                        GAP * activePage -
                        itemWidth * 0.4
                  }px)`
                : `translateX(-${activePage * (100 / slidesToShow)}%)`,
            }}
          >
            {children}
          </div>
        </div>
        {activePage > 0 ? (
          <button
            type="button"
            className={clsx(styles.arrowButton, styles.arrowButtonPrevious)}
            onClick={previous}
          >
            <FontAwesomeIcon icon={faArrowLeft} color="var(--theme-800)" />
          </button>
        ) : null}
        {hasMore ? (
          <button
            type="button"
            className={styles.arrowButton}
            color="var(--theme-200)"
            onClick={next}
          >
            <FontAwesomeIcon icon={faArrowRight} color="var(--theme-800)" />
          </button>
        ) : null}
      </div>
    </div>
  );
}

export function CarouselItem({
  width,
  children,
  className = "",
}: {
  width?: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div className={clsx(styles.item, className)} style={{ width }}>
      {children}
    </div>
  );
}

export default Carousel;
