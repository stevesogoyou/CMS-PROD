// utils.js
/**
 * Convertit les champs BigInt d'un objet ou d'un tableau d'objets en chaînes de caractères.
 * @param {Object|Array} data - Un objet ou un tableau d'objets à convertir.
 * @returns {Object|Array} - Les données avec les BigInt convertis en chaînes.
 */
function sanitizeBigInt(data) {
    if (Array.isArray(data)) {
        return data.map(item => sanitizeBigInt(item)); // Appliquer récursivement pour un tableau d'objets
    }

    if (typeof data === 'object' && data !== null) {
        return Object.fromEntries(
            Object.entries(data).map(([key, value]) =>
                typeof value === 'bigint' ? [key, value.toString()] : [key, value]
            )
        );
    }

    return data; // Retourner tel quel si ce n'est pas un objet ou un tableau
}


function sanitizeBigIntAuth(data) {
    if (Array.isArray(data)) {
        return data.map(item => sanitizeBigIntAuth(item)); // Récursivement pour les tableaux
    }

    if (typeof data === 'object' && data !== null) {
        return Object.fromEntries(
            Object.entries(data).map(([key, value]) =>
                typeof value === 'bigint' ? [key, value.toString()] : [key, sanitizeBigIntAuth(value)]
            )
        );
    }

    return data; // Retourner tel quel si ce n'est pas un objet ou un tableau
}

module.exports = { sanitizeBigInt, sanitizeBigIntAuth };
