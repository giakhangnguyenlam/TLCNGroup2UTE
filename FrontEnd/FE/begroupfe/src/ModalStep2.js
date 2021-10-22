import React from "react"
import CategoryAccessories from "./CategoryAccessories"
import CategoryClothes from "./CategoryClothes"
import CategoryShoes from "./CategoryShoes"

function ModalStep2({ category, id }) {
  if (category === "1") {
    return <CategoryClothes />
  }
  if (category === "2") {
    return <CategoryShoes />
  }
  if (category === "3") {
    return <CategoryAccessories />
  }
}

export default ModalStep2
