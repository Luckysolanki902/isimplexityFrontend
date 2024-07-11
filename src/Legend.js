import React from "react";

const Legend = () => {
    return (
        <div className="legend">
            <h4 id="usageH" style={{ flexShrink: '0', wordBreak: 'keep-all' }}>$ Usage</h4 >
            <div className="labelParent">
                <div className="labelRail">
                    <div className="label l1">
                        <div className="c1 c w1"></div>
                        <div>
                            <span className="labSpan">
                                <span className="smbox c1"></span>
                                <span className="range">&gt; $5K</span>

                            </span>
                            <span>36%</span>
                        </div>
                    </div>
                    <div className="label l2">
                        <div className="c2 c w2"></div>
                        <div>
                            <span className="labSpan">
                                <span className="smbox c1"></span>
                                <span className="range">$1K - $5K</span>

                            </span>
                            <span>24%</span>
                        </div>
                    </div>
                    <div className="label l3">
                        <div className="c3 c w3"></div>
                        <div>
                            <span className="labSpan">

                                <span className="smbox c1"></span>
                                <span className="range">$500 - $1K</span>
                            </span>
                            <span>20%</span>
                        </div>

                    </div>
                    <div className="label l4">
                        <div className="c4 c w4"></div>
                        <div>
                            <span  className="labSpan">

                                <span className="smbox c1"></span>
                                <span className="range">&lt; $500 </span>
                            </span>
                            <span>20%</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Legend;
