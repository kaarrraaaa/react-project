import React, { useState, useMemo } from "react";
import "./CardsList.css";
import Header from "../../components/Header/Header";
import Cards from "../../components/Cards/Cards";
import Pagination from "../../components/Pagination/Pagination";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PAGE_SIZE = 4;

export default function CardsList({ onLogout }) {
  const cards = useSelector((state) => state.cards);
  const [filter, setFilter] = useState({
    searching: "",
    nameFilter: "all",
    startsWith: "",
    page: 1,
  });

  const navigate = useNavigate();

  const filteredCards = cards.filter((card) => {
    const { searching, nameFilter, startsWith, idFilter } = filter;
    let nameMatches = true;
    let idMatches = true;

    if (nameFilter === "starts") {
      nameMatches =
        startsWith &&
        card.first_name.toLowerCase().startsWith(startsWith.toLowerCase());
    }

    if (idFilter === "even") {
      idMatches = card.id % 2 === 0;
    } else if (idFilter === "odd") {
      idMatches = card.id % 2 !== 0;
    } else if (idFilter === "all") {
      idMatches = true;
    }

    const searchMatches = card.first_name
      .toLowerCase()
      .includes(searching.toLowerCase());
    return nameMatches && searchMatches && idMatches;
  });

  const startIndex = (filter.page - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const visibleCards = filteredCards.slice(startIndex, endIndex);

  const pagesCount = useMemo(() => {
    if (!filteredCards.length) return 0;
    return Math.ceil(filteredCards.length / PAGE_SIZE);
  }, [filteredCards]);

  const paginate = (pageNumber) =>
    setFilter((prevFilter) => ({ ...prevFilter, page: pageNumber }));

  const handleUserClick = (userId) => {
    navigate(`/users/${userId}`, { state: { onUserUpdate: updateUserData } });
  };

  const handleLogout = () => {
    onLogout();
  };

  return (
    <div>
      <Header
        filter={filter}
        setFilter={setFilter}
        pageSize={PAGE_SIZE}
        isLogged={true}
        handleLogout={handleLogout}
      />

      <Cards
        key="cards"
        loading={false}
        onUserClick={handleUserClick}
        cards={visibleCards}
      />

      {pagesCount > 1 && (
        <Pagination
          key="pagination"
          activePage={filter.page}
          updatePage={paginate}
          pagesCount={pagesCount}
        />
      )}
    </div>
  );
}
