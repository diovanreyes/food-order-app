import React, { useEffect } from "react";
import style from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealsItem from "./MealsItem/MealsItem";
import useHttp from "../../hooks/useHttp";

const loadedMeals = [];

const AvailableMeals = () => {
  const { fetchData, loading, error } = useHttp();

  useEffect(() => {
    fetchData(
      {
        url: "https://foodmenu-b374a-default-rtdb.asia-southeast1.firebasedatabase.app/Meals.json",
      },
      (data) => {
        for (const d in data) {
          loadedMeals.push({
            id: d,
            ...data[d],
          });
        }
      }
    );
  }, [fetchData]);

  if (loading) {
    return (
      <section className={style.meals}>
        <Card>
          {error ? (
            <p className={style["error-msg"]}>Something went wrong! {error}</p>
          ) : (
            <section className="dots-container">
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </section>
          )}
        </Card>
      </section>
    );
  }

  const mealList = loadedMeals.map((meal) => (
    <MealsItem
      name={meal.name}
      desc={meal.description}
      price={meal.price}
      id={meal.id}
      key={meal.id}
    />
  ));
  return (
    <section className={style.meals}>
      <Card>
        <ul>{mealList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
