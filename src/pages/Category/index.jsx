import React from "react";
import CategoryItem from "./CategoryItem";
import PageLayout from "../../components/PageLayout";

const Category = ({ name, type }) => {

    return (
        <div>
            <PageLayout>
                <CategoryItem name={name} type={type} />
            </PageLayout>
        </div>
    );
};

export default Category;
