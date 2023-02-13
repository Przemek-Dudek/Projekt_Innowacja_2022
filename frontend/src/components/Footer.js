import React from "react";
import "./Button.css"

export function Footer({}) {
  return (        
    <footer>
        <section class="section-1">
            <div class="section-1-item socials">
                <i class="fa-brands fa-facebook-f"></i>
                <i class="fa-brands fa-instagram"></i>
            </div>
            <div class="section-1-item info">
                <h3>lorem Ipsum</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. pulvinar neque accumsan, pretium libero.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. pulvinar neque accumsan, pretium libero.</p>
            </div>
            <div class="section-1-item telephone">
                <div class="phone-icon">
                    <i class="fa-solid fa-phone"></i>
                </div>
                <div class="phone-info">
                    <h4>555-555-555</h4>
                </div>
            </div>
        </section>
        <section class="section-2">
            <div class="section-2-item someting">
                <p>ABABA</p>
            </div>
        </section>
    </footer>
  );
}


