export const mockRevenueData = [
  { date: '2025-05-01', ca: 145000, tickets: 48 },
  { date: '2025-05-02', ca: 189000, tickets: 63 },
  { date: '2025-05-03', ca: 156000, tickets: 52 },
  { date: '2025-05-04', ca: 210000, tickets: 70 },
  { date: '2025-05-05', ca: 234000, tickets: 78 },
  { date: '2025-05-06', ca: 198000, tickets: 66 },
  { date: '2025-05-07', ca: 267000, tickets: 89 },
  { date: '2025-05-08', ca: 189000, tickets: 63 },
  { date: '2025-05-09', ca: 222000, tickets: 74 },
  { date: '2025-05-10', ca: 198000, tickets: 66 },
  { date: '2025-05-11', ca: 245000, tickets: 81 },
  { date: '2025-05-12', ca: 278000, tickets: 92 },
  { date: '2025-05-13', ca: 189000, tickets: 63 },
  { date: '2025-05-14', ca: 234000, tickets: 78 },
  { date: '2025-05-15', ca: 267000, tickets: 89 },
  { date: '2025-05-16', ca: 198000, tickets: 66 },
  { date: '2025-05-17', ca: 256000, tickets: 85 },
  { date: '2025-05-18', ca: 289000, tickets: 96 },
  { date: '2025-05-19', ca: 178000, tickets: 59 },
  { date: '2025-05-20', ca: 234000, tickets: 78 },
  { date: '2025-05-21', ca: 267000, tickets: 89 },
  { date: '2025-05-22', ca: 198000, tickets: 66 },
  { date: '2025-05-23', ca: 245000, tickets: 81 },
  { date: '2025-05-24', ca: 278000, tickets: 92 },
  { date: '2025-05-25', ca: 189000, tickets: 63 },
  { date: '2025-05-26', ca: 234000, tickets: 78 },
  { date: '2025-05-27', ca: 267000, tickets: 89 },
  { date: '2025-05-28', ca: 198000, tickets: 66 },
  { date: '2025-05-29', ca: 256000, tickets: 85 },
  { date: '2025-05-30', ca: 289000, tickets: 96 },
];

export const mockTopMerchants = [
  { name: 'Restaurant Le Baobab', ca: 2450000, tickets: 816 },
  { name: 'Boulangerie du Coin', ca: 1890000, tickets: 630 },
  { name: 'Snack Express', ca: 1560000, tickets: 520 },
  { name: 'Café de la Poste', ca: 1340000, tickets: 446 },
  { name: 'Pizzeria Roma', ca: 1120000, tickets: 373 },
];

export const mockTopEmployees = [
  { name: 'Amadou Diallo', firstName: 'Amadou', orders: 245, service: 'Commercial' },
  { name: 'Fatou Ndiaye', firstName: 'Fatou', orders: 198, service: 'Marketing' },
  { name: 'Ousmane Sall', firstName: 'Ousmane', orders: 187, service: 'RH' },
  { name: 'Awa Sy', firstName: 'Awa', orders: 156, service: 'IT' },
  { name: 'Moussa Ba', firstName: 'Moussa', orders: 134, service: 'Commercial' },
];

export const mockMerchants = [
  { id: '1', name: 'Restaurant Le Baobab', email: 'baobab@example.com', phone: '77 123 45 67', address: '123 Av. Cheikh Anta Diop', siret: 'SN012345678', status: 'actif', balance: 2450000, lastRefund: '2025-05-15' },
  { id: '2', name: 'Boulangerie du Coin', email: 'boulangerie@example.com', phone: '78 234 56 78', address: '45 Rue de la République', siret: 'SN023456789', status: 'actif', balance: 1890000, lastRefund: '2025-05-10' },
  { id: '3', name: 'Snack Express', email: 'snack@example.com', phone: '76 345 67 89', address: '67 Bvd. du Progrès', siret: 'SN034567890', status: 'suspendu', balance: 1560000, lastRefund: '2025-04-20' },
  { id: '4', name: 'Café de la Poste', email: 'cafe@example.com', phone: '77 456 78 90', address: '89 Pl. de l\'Indépendance', siret: 'SN045678901', status: 'actif', balance: 1340000, lastRefund: '2025-05-18' },
  { id: '5', name: 'Pizzeria Roma', email: 'roma@example.com', phone: '78 567 89 01', address: '12 Rue de Marseille', siret: 'SN056789012', status: 'en attente', balance: 0, lastRefund: null },
  { id: '6', name: 'Sushi Bar', email: 'sushi@example.com', phone: '76 678 90 12', address: '34 Av. Léopold Sédar', siret: 'SN067890123', status: 'actif', balance: 890000, lastRefund: '2025-05-22' },
  { id: '7', name: 'Kebab House', email: 'kebab@example.com', phone: '77 789 01 23', address: '56 Rue de Thiès', siret: 'SN078901234', status: 'suspendu', balance: 567000, lastRefund: '2025-03-15' },
  { id: '8', name: 'La Table Fine', email: 'tablefine@example.com', phone: '78 890 12 34', address: '78 Bvd. du Centenaire', siret: 'SN089012345', status: 'actif', balance: 1234000, lastRefund: '2025-05-25' },
  { id: '9', name: 'Food Corner', email: 'food@example.com', phone: '76 901 23 45', address: '90 Av. de la Paix', siret: 'SN090123456', status: 'en attente', balance: 0, lastRefund: null },
  { id: '10', name: 'Dakar Grill', email: 'grill@example.com', phone: '77 012 34 56', address: '11 Rue de Dakar', siret: 'SN101234567', status: 'actif', balance: 1780000, lastRefund: '2025-05-28' },
];

export const mockEmployees = [
  { id: '1', lastName: 'Diallo', firstName: 'Amadou', email: 'amadou.d@company.com', phone: '77 111 22 33', service: 'Commercial', contractType: 'CDI', status: 'actif', ticketsLeft: 12, lastRefill: '2025-05-01' },
  { id: '2', lastName: 'Ndiaye', firstName: 'Fatou', email: 'fatou.n@company.com', phone: '78 222 33 44', service: 'Marketing', contractType: 'CDI', status: 'actif', ticketsLeft: 5, lastRefill: '2025-04-15' },
  { id: '3', lastName: 'Sall', firstName: 'Ousmane', email: 'ousmane.s@company.com', phone: '76 333 44 55', service: 'RH', contractType: 'CDD', status: 'actif', ticketsLeft: 20, lastRefill: '2025-05-10' },
  { id: '4', lastName: 'Sy', firstName: 'Awa', email: 'awa.s@company.com', phone: '77 444 55 66', service: 'IT', contractType: 'CDI', status: 'suspendu', ticketsLeft: 0, lastRefill: '2025-03-01' },
  { id: '5', lastName: 'Ba', firstName: 'Moussa', email: 'moussa.b@company.com', phone: '78 555 66 77', service: 'Commercial', contractType: 'Stage', status: 'actif', ticketsLeft: 8, lastRefill: '2025-05-05' },
  { id: '6', lastName: 'Faye', firstName: 'Mariama', email: 'mariama.f@company.com', phone: '76 666 77 88', service: 'Finance', contractType: 'CDI', status: 'en attente', ticketsLeft: 20, lastRefill: '2025-05-20' },
  { id: '7', lastName: 'Seck', firstName: 'Ibrahim', email: 'ibrahim.s@company.com', phone: '77 777 88 99', service: 'Commercial', contractType: 'CDD', status: 'actif', ticketsLeft: 15, lastRefill: '2025-05-12' },
  { id: '8', lastName: 'Gueye', firstName: 'Sokhna', email: 'sokhna.g@company.com', phone: '78 888 99 00', service: 'Marketing', contractType: 'CDI', status: 'actif', ticketsLeft: 3, lastRefill: '2025-04-20' },
  { id: '9', lastName: 'Cissé', firstName: 'Abdou', email: 'abdou.c@company.com', phone: '76 999 00 11', service: 'IT', contractType: 'Stage', status: 'actif', ticketsLeft: 18, lastRefill: '2025-05-15' },
  { id: '10', lastName: 'Sow', firstName: 'Khadija', email: 'khadija.s@company.com', phone: '77 000 11 22', service: 'RH', contractType: 'CDI', status: 'suspendu', ticketsLeft: 0, lastRefill: '2025-02-01' },
];

export const mockNotebooks = [
  { id: '1', employee: 'Amadou Diallo', ticketsLeft: 12, total: 20, createdAt: '2025-05-01', status: 'actif', refills: 2 },
  { id: '2', employee: 'Fatou Ndiaye', ticketsLeft: 5, total: 20, createdAt: '2025-04-15', status: 'actif', refills: 3 },
  { id: '3', employee: 'Ousmane Sall', ticketsLeft: 20, total: 20, createdAt: '2025-05-10', status: 'actif', refills: 1 },
  { id: '4', employee: 'Awa Sy', ticketsLeft: 0, total: 20, createdAt: '2025-03-01', status: 'épuisé', refills: 4 },
  { id: '5', employee: 'Moussa Ba', ticketsLeft: 8, total: 20, createdAt: '2025-05-05', status: 'actif', refills: 2 },
  { id: '6', employee: 'Mariama Faye', ticketsLeft: 20, total: 20, createdAt: '2025-05-20', status: 'actif', refills: 0 },
  { id: '7', employee: 'Ibrahim Seck', ticketsLeft: 15, total: 20, createdAt: '2025-05-12', status: 'actif', refills: 1 },
  { id: '8', employee: 'Sokhna Gueye', ticketsLeft: 3, total: 20, createdAt: '2025-04-20', status: 'actif', refills: 3 },
  { id: '9', employee: 'Abdou Cissé', ticketsLeft: 18, total: 20, createdAt: '2025-05-15', status: 'actif', refills: 1 },
  { id: '10', employee: 'Khadija Sow', ticketsLeft: 0, total: 20, createdAt: '2025-02-01', status: 'épuisé', refills: 5 },
];

export const mockRefunds = [
  { id: '1', merchant: 'Restaurant Le Baobab', amount: 245000, date: '2025-05-15', method: 'Virement', reference: 'VIR-2025-0156', status: 'effectué' },
  { id: '2', merchant: 'Boulangerie du Coin', amount: 189000, date: '2025-05-10', method: 'Espèces', reference: 'ESP-2025-0089', status: 'effectué' },
  { id: '3', merchant: 'Café de la Poste', amount: 134000, date: '2025-05-18', method: 'Chèque', reference: 'CHQ-2025-0045', status: 'effectué' },
  { id: '4', merchant: 'Sushi Bar', amount: 89000, date: '2025-05-22', method: 'Virement', reference: 'VIR-2025-0189', status: 'effectué' },
  { id: '5', merchant: 'La Table Fine', amount: 123400, date: '2025-05-25', method: 'Espèces', reference: 'ESP-2025-0123', status: 'effectué' },
  { id: '6', merchant: 'Dakar Grill', amount: 178000, date: '2025-05-28', method: 'Virement', reference: 'VIR-2025-0210', status: 'effectué' },
  { id: '7', merchant: 'Snack Express', amount: 156000, date: '2025-04-20', method: 'Chèque', reference: 'CHQ-2025-0032', status: 'effectué' },
  { id: '8', merchant: 'Kebab House', amount: 56700, date: '2025-03-15', method: 'Espèces', reference: 'ESP-2025-0056', status: 'effectué' },
];

export const mockLogs = [
  { id: '1', action: 'Connexion admin', actor: 'Super Admin', email: 'admin@system.com', type: 'admin', date: '2025-06-10 08:30', details: 'Connexion depuis Dakar' },
  { id: '2', action: 'Création marchand', actor: 'Super Admin', email: 'admin@system.com', type: 'admin', date: '2025-06-09 14:20', details: 'Création du compte Pizzeria Roma' },
  { id: '3', action: 'Remboursement', actor: 'Super Admin', email: 'admin@system.com', type: 'admin', date: '2025-06-09 10:15', details: 'Remboursement Dakar Grill 178000 FCFA' },
  { id: '4', action: 'Suspension employé', actor: 'Super Admin', email: 'admin@system.com', type: 'admin', date: '2025-06-08 16:45', details: 'Suspension du compte Awa Sy' },
  { id: '5', action: 'Rechargement carnet', actor: 'Super Admin', email: 'admin@system.com', type: 'admin', date: '2025-06-08 09:00', details: 'Rechargement de 20 tickets pour Ibrahim Seck' },
  { id: '6', action: 'Connexion marchand', actor: 'Restaurant Le Baobab', email: 'baobab@example.com', type: 'marchand', date: '2025-06-07 11:30', details: 'Validation de 12 tickets' },
  { id: '7', action: 'Connexion employé', actor: 'Amadou Diallo', email: 'amadou.d@company.com', type: 'employé', date: '2025-06-07 09:15', details: 'Commande de 3 tickets' },
  { id: '8', action: 'Modification prix', actor: 'Super Admin', email: 'admin@system.com', type: 'admin', date: '2025-06-06 15:30', details: 'Modification du prix ticket à 3000 FCFA' },
  { id: '9', action: 'Invitation employé', actor: 'Super Admin', email: 'admin@system.com', type: 'admin', date: '2025-06-05 10:00', details: 'Invitation envoyée à Mariama Faye' },
  { id: '10', action: 'Suspension marchand', actor: 'Super Admin', email: 'admin@system.com', type: 'admin', date: '2025-06-04 14:00', details: 'Suspension du compte Snack Express' },
  { id: '11', action: 'Création carnet', actor: 'Système', email: 'system@auto', type: 'système', date: '2025-06-03 08:00', details: 'Création automatique carnet pour nouvel employé' },
  { id: '12', action: 'Export logs', actor: 'Super Admin', email: 'admin@system.com', type: 'admin', date: '2025-06-02 17:00', details: 'Export CSV des logs du mois' },
];

export const mockNotifications = [
  { id: '1', title: 'Nouveau carnet demandé', message: 'Fatou Ndiaye a demandé un rechargement de carnet', date: '2025-06-10 09:30', type: 'alert', read: false },
  { id: '2', title: 'Récapitulatif quotidien', message: '245 commandes validées hier pour un CA de 734 000 FCFA', date: '2025-06-10 08:00', type: 'info', read: false },
  { id: '3', title: 'Tentative de connexion suspecte', message: '3 tentatives échouées depuis l\'IP 192.168.1.45', date: '2025-06-09 22:15', type: 'alert', read: true },
  { id: '4', title: 'Nouveau carnet demandé', message: 'Sokhna Gueye a demandé un rechargement de carnet', date: '2025-06-09 14:00', type: 'alert', read: true },
  { id: '5', title: 'Récapitulatif quotidien', message: '189 commandes validées hier pour un CA de 567 000 FCFA', date: '2025-06-09 08:00', type: 'info', read: true },
  { id: '6', title: 'Invitation expirée', message: 'L\'invitation de Food Corner a expiré', date: '2025-06-08 16:00', type: 'warning', read: true },
];

export const config = {
  ticketPrice: 3000,
  manualCodeValidity: 10,
  autoRegistration: true,
  defaultNotebookSize: 20,
  invitationExpiry: 48,
};
