import React from "react";
import "./Footer.scss";

function Footer() {
  return (
    <footer>
      <div className="footer fixed-bottom bg-dark text-white text-center d-flex justify-content-around">
        <button
          onClick={() => (window.location = "/dashboard")}
          type="button"
          className="btn btn-outline-primary p-1 mx-1 mb-2 mt-2"
        >
          <i className="fas fa-car mx-2"></i>Add
        </button>
        <button
          onClick={() => (window.location = "/notify")}
          type="button"
          className="btn btn-outline-success p-1 mx-1 mb-2 mt-2"
        >
          <i className="fas fa-sms mx-2"></i>Notify
        </button>
        <button
          onClick={() => (window.location = "/scan")}
          type="button"
          className="btn btn-outline-secondary p-1 mx-1 mb-2 mt-2"
        >
          <i className="fas fa-qrcode mx-2"></i>Scan
        </button>
        <button
          onClick={() => (window.location = "retrieve")}
          type="button"
          className="btn btn-outline-info p-1 mx-1 mb-2 mt-2"
        >
          <i className="fas fa-search mx-2"></i>Retrieve
        </button>
        <button
          onClick={() => (window.location = "/pay")}
          type="button"
          className="btn btn-outline-light p-1 mx-1 mb-2 mt-2"
        >
          <i className="fas fa-money-bill-wave mx-2"></i>Pay
        </button>
        <button
          onClick={() => (window.location = "/chart")}
          type="button"
          className="btn btn-outline-warning p-1 mx-1 mb-2 mt-2"
        >
          <i className="fas fa-chart-bar mx-2"></i>Report
        </button>
        {/* <button onClick={() => window.location='/space'}type="button" class="btn btn-outline-warning p-1 mx-1 mb-2 mt-2"><i class="fas fa-parking mx-2"></i>Space</button> */}

        {/* <p className="navbar-text my-2 my-lg-0">
                Copyright  © EZ Valpark Inc. 2019
            </p>      */}
      </div>
    </footer>
  );
}
export default Footer;
