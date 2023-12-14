import React from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const FooterProduct = () => {
  return (
    <>
      <section className="bg-primary flex-col justify-content-center align-items-center p-4">
        <Row>
          <Col lg="3" md="6" sm="12" xs="12" className="p-2">
            <div>
              <div>
                <h4 className="heading__4 text-white text-decoration-none">MARKET ID</h4>
              </div>
              <div>
                <p className="text-white">Ecommerce yang menyediakan berbagai fashion dan style</p>
              </div>
              <div>
                <div className="text-white">
                  <i className="bi bi-telephone-fill me-2"></i> 081225719823
                </div>
                <div className="text-white">
                  <i className="bi bi-envelope me-2"></i> market.id@gmail.com
                </div>
              </div>
            </div>
          </Col>
          <Col lg="3" md="6" sm="12" xs="12" className="p-2">
            <div>
              <div>
                <h3 className="heading__4 text-white text-decoration-none">INFORMASI</h3>
              </div>
              <div>
                <div>
                  <a href="http://" className="text-white text-decoration-none">
                    Bagaimana Cara Order
                  </a>
                </div>
                <div>
                  <a href="http://" className="text-white text-decoration-none">
                    Informasi Pembayaran
                  </a>
                </div>
                <div>
                  <a href="http://" className="text-white text-decoration-none">
                    Tuker dan Ganti Produk
                  </a>
                </div>
                <div>
                  <a href="http://" className="text-white text-decoration-none">
                    Cara Menggunakan Kode Diskon
                  </a>
                </div>
                <div>
                  <a href="http://" className="text-white text-decoration-none">
                    FAQs
                  </a>
                </div>
              </div>
            </div>
          </Col>
          <Col lg="3" md="6" sm="12" xs="12" className="p-2">
            <div>
              <div>
                <h4 className="heading__4 text-white text-decoration-none">CUSTOMER SERVICE</h4>
              </div>
              <div>
                <Link to="/contact" className="text-white text-decoration-none">
                  Contact Us
                </Link>
              </div>
            </div>
          </Col>
          <Col lg="3" md="6" sm="12" xs="12" className="p-2">
            <div className="flex flex-row">
              <div>
                <h4 className="heading__4 text-white text-decoration-none">SOCIAL MEDIA</h4>
              </div>
              <div className="d-flex flex-row justify-content-start align-items-center ">
                <Link to="https://www.youtube.com/" className="text-white fs-4 me-3 ">
                  <i className="bi bi-youtube my-1"></i>
                </Link>
                <Link to="https://www.instagram.com/" className="text-white fs-4 me-3 ">
                  <i className="bi bi-instagram my-1"></i>
                </Link>
                <Link to="https://www.tiktok.com/" className="text-white fs-4 me-3">
                  <i className="bi bi-tiktok my-1"></i>
                </Link>
                <Link to="https://www.facebook.com/" className="text-white fs-4 me-3">
                  <i className="bi bi-facebook my-1"></i>
                </Link>
                <Link to="https://www.twitter.com/" className="text-white fs-4 me-3">
                  <i className="bi bi-twitter my-1"></i>
                </Link>
              </div>
            </div>
          </Col>
        </Row>
      </section>
      <Row className="bg-primary">
        <Col>
          <div className="mt-5 border-top p-2 d-flex justify-content-center align-items-center bg-primary">
            <h4 className="heading__4 text-white py-2">Market.ID @Copyright Indonesia 2023 | All Right Reserved</h4>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default FooterProduct;
