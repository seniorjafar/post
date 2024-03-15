import React, { useEffect, useState } from 'react';
import { Card, Pagination, Modal, Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import axios from 'axios';

const Home = () => {
  const [cards, setCards] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCard, setSelectedCard] = useState(null); // New state to track the selected card
  const cardsPerPage = 8;
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = cards.slice(indexOfFirstCard, indexOfLastCard);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    axios.get('http://localhost:3000/cards')
      .then(response => {
        setCards(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const openCardModal = (card) => {
    setSelectedCard(card);
  };

  const closeCardModal = () => {
    setSelectedCard(null);
  };

  return (
    <div>
      <Navbar expand="sm" bg="primary" variant="dark">
        <Container>
          <Nav className="me-auto">
            <Nav.Link href="#">Home</Nav.Link>
            <Nav.Link href="#business">Business</Nav.Link>
            <Nav.Link href="#entertainment">Entertainment</Nav.Link>
            <Nav.Link href="#general">General</Nav.Link>
            <Nav.Link href="#health">Health</Nav.Link>
            <Nav.Link href="#science">Science</Nav.Link>
            <Nav.Link href="#sports">Sports</Nav.Link>
            <Nav.Link href="#technology">Technology</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <h1>Our Latest Posts</h1>
      <Container>
        <div className="card-container">
          {currentCards.map(card => (
            <Card expand="sm" key={card.id} style={{ width: '296px', border: 'none' }}>
              <Card.Body>
                <div
                  className="button-start"
                  style={{ width: '296px', height: '312px', backgroundColor: '#109BE9' }}
                  onClick={() => openCardModal(card)}
                >
                  {card.id === 1 ? (
                    <button className="button-start-text">{card.title}</button>
                  ) : (
                    <Card.Title>{card.title}</Card.Title>
                  )}
                </div>
                <Card.Subtitle className="mb-2 text-muted">{card.subtitle}</Card.Subtitle>
                <Card.Text>{card.text}</Card.Text>
                <Card.Link href={card.link}>{card.linkText}</Card.Link>
                <Card.Link href={card.time}>{card.time}</Card.Link>
              </Card.Body>
            </Card>
          ))}
        </div>
        {/* Modal */}
<Modal show={selectedCard !== null} onHide={closeCardModal} animation={false} dialogClassName="modal-right">
  <Modal.Header closeButton>
    <Modal.Title>{selectedCard?.title}</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Card.Subtitle className="mb-2 text-muted">{selectedCard?.subtitle}</Card.Subtitle>
    <Card.Text>{selectedCard?.text}</Card.Text>
    <Card.Link href={selectedCard?.link}>{selectedCard?.linkText}</Card.Link>
    <Card.Link href={selectedCard?.time}>{selectedCard?.time}</Card.Link>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={closeCardModal}>Yopish</Button>
  </Modal.Footer>
</Modal>
      </Container>
      <Pagination>
        {Array.from(Array(Math.ceil(cards.length / cardsPerPage)), (_, index) => (
          <Pagination.Item
            key={index + 1}
            active={index + 1 === currentPage}
            onClick={() => paginate(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    </div>
  );
};

export default Home;