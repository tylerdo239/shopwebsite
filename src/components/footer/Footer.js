import "./Footer.css";
import { Link } from "react-router-dom";

// Data of footer component
const dataFooter = [
  {
    name: "CUSTOMER SERVICE",
    content: [
      "Help & Contact Us",
      "Returns & Refunds",
      "Online Stores",
      "Terms & Conditions",
    ],
  },
  {
    name: "COMPANY",
    content: ["What We Do", "Available Services", "Latest Posts", "FAQs"],
  },
  {
    name: "SOCIAL MEDIA",
    content: ["Twitter", "Instagram", "Facebook", "Pinterest"],
  },
];

function Footer() {
  return (
    <footer>
      <div className="footer-wrap">
        {dataFooter.map((item) => (
          <div key={item.name} className="footer-item">
            <h3>{item.name}</h3>
            {item.content.map((content) => (
              <Link key={content} to="#">
                {content}
              </Link>
            ))}
          </div>
        ))}
      </div>
    </footer>
  );
}

export default Footer;
