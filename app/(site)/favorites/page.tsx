"use client";

import { useFavorites } from "@/app/(site)/favorites/(FavoritesContext)/FavoritesContext";
import PropertyCard from "@/components/PropertyCard";
import { Container, Box, Typography } from "@mui/material";

function FavoritesPage() {
  const { favoriteProperties } = useFavorites();

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 6, minHeight: "80vh" }}>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ mb: 4, color: "#111827", fontWeight: "bold" }}
        >
          العقارات المفضلة
        </Typography>

        {favoriteProperties.length === 0 ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              mt: 8,
              gap: 2,
            }}
          >
            <Typography variant="body1" color="text.secondary" align="center">
              لم تقم بإضافة أي عقارات إلى المفضلة حتى الآن.
            </Typography>
          </Box>
        ) : (
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center" style={{ direction: "rtl" }}>
            {favoriteProperties.map((property) => (
              <div key={property._id} className="w-full flex justify-center">
                <PropertyCard property={property} />
              </div>
            ))}
          </div>
        )}
      </Box>
    </Container>
  );
}

export default FavoritesPage;