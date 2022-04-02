import React from "react";
import { FooterItems, SocialItems } from "./FooterItems";

export const Footer = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="footer py-3 container">
        <div className="row">
          <div className="lg-4 md-4 mb-4 mb-lg-0 col">
            <h2 className="text-uppercase text-white font-weight-bold mb-4">
              Beginner.pl
            </h2>
            <p className="font-italic text-muted">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt.
            </p>
            <ul className="footer-text list-inline mt-4">
              {SocialItems.map((item) => {
                return (
                  <li key={item.id} className="list-inline-item">
                    <a
                      target="_blank"
                      rel="noreferrer"
                      className="mb-2"
                      href={item.url}
                    >
                      {item.icon}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
          {FooterItems.map((item) => {
            return (
              <div key={item.id} className="lg-2 md-6 mb-4 mb-lg-0 col">
                <h6 className="text-uppercase text-white font-weight-bold ml-2 mb-4">
                  {item.title}
                </h6>
                <div className="navbar-nav list-unstyled mb-0">
                  <a href={item.subtitle_url} className="mb-2 nav-link">
                    {item.subtitle}
                  </a>
                </div>
                <div className="navbar-nav list-unstyled mb-0">
                  <a href={item.subtitle2_url} className="mb-2 nav-link">
                    {item.subtitle2}
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Footer;
