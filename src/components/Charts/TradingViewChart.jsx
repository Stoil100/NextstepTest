// TradingViewWidget.js
import React, { useEffect, useRef } from "react";
import styles from './TradingViewChart.module.css';
import { useParams } from "react-router-dom";

let tvScriptLoadingPromise;

export default function TradingViewWidget(props) {
  const params=useParams();
  const onLoadScriptRef = useRef();
  useEffect(() => {
    onLoadScriptRef.current = createWidget;

    if (!tvScriptLoadingPromise) {
      tvScriptLoadingPromise = new Promise((resolve) => {
        const script = document.createElement("script");
        script.id = "tradingview-widget-loading-script";
        script.src = "https://s3.tradingview.com/tv.js";
        script.type = "text/javascript";
        script.onload = resolve;

        document.head.appendChild(script);
      });
    }

    tvScriptLoadingPromise.then(
      () => onLoadScriptRef.current && onLoadScriptRef.current()
    );

    return () => (onLoadScriptRef.current = null);

    function createWidget() {
      if (
        document.getElementById("technical-analysis-chart-demo") &&
        "TradingView" in window
      ) {
        new window.TradingView.widget({
          container_id: "technical-analysis-chart-demo",
          height:"100%",
          width:"100%",
          symbol: `${params.chartId}`,
          interval: "60",
          timezone: "exchange",
          theme: "dark",
          style: "1",
          toolbar_bg: "#f1f3f6",
          withdateranges: true,
          hide_side_toolbar: false,
          allow_symbol_change: true,
          save_image: false,
          studies: [
            "ROC@tv-basicstudies",
            "StochasticRSI@tv-basicstudies",
            "MASimple@tv-basicstudies",
          ],
          locale: "en",
        });
      }
    }
  }, [props]);
  return (
    <>
    <div className={styles.chartBox} id="technical-analysis-chart-demo" />
    <div className={styles.tradingview_widget_container}>
      <div className={styles.tradingview_widget_copyright}>
        <a
          href={`https://www.tradingview.com/symbols/${params.chartId}/`}
          rel="noopener"
          target="_blank"
        >
          <span className={styles.anchorText}>Chart by TradingView</span>
        </a>
      </div>
    </div>
    </>
  );
}
