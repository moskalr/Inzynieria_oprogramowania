import { useMemo, useCallback } from 'react';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box } from '@mui/system';

export const CategoriesList = ({ categories }) => {
  const findChildren = useCallback((category, categories) => {
    const children = categories.filter(
      (child) => child.parent && child.parent.categoryId === category.categoryId
    );
    if (children.length > 0) {
      children.forEach((child) => {
        child.children = findChildren(child, categories);
      });
    }
    return children;
  }, []);

  const restructuredCategoriesTree = useMemo(() => {
    const initialCategories = categories.filter(
      (category) => category.parent === null
    );

    initialCategories.forEach((initialCategory) => {
      initialCategory.children = findChildren(initialCategory, categories);
    });

    return initialCategories;
  }, [categories, findChildren]);

  const renderAccordion = (category) => {
    return (
      <Accordion sx={{ marginY: 2 }} key={category.categoryId}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          {category.categoryName}
        </AccordionSummary>
        <AccordionDetails>
          {category.children &&
            category.children.map((child) => renderAccordion(child))}
        </AccordionDetails>
      </Accordion>
    );
  };

  return (
    <Box padding={4}>
      {restructuredCategoriesTree &&
        restructuredCategoriesTree.map((category) => renderAccordion(category))}
    </Box>
  );
};
