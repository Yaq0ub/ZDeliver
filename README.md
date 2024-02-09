# ZDeliver
A react native application for product delivery

Client project was created using `npx create-expo-app --template` and then choosing the TypeScript template.

# ZDeliver Application Development Steps:

## 1. Requirements Gathering and Analysis
### Stakeholder Meetings
- [x] **Identifying Stakeholders**: Prospective client companies, end-users, sales representitive and future team members.
- [x] **Planning Meetings**: Scheduled meeting with sales representitive to understand the market and end-user requirements
- [x] **Conducting Meetings**: Conducted initial meeting with the sales representitive to understand sales strategy, target market, and potential client profiles.
- [x] **Gathering Requirements**: Collected requirements focusing on versatile features that can be customized for different client companies. Key requirements includes customizable admin dashboard, user-friendly interface and easy to use order management with a scalable architecture.
- [x] **Feedback Loop**: Established a weekly meeting schedule with the sales representive to keep up with updates and changes that need to be accommodated 
- [x] **Documentation**: Documented the outcome of meetings and research finding.

### Requirement Documentation
- [x] **Functional Requirements**: 

| Module | Requirement | Description |
| ------ | ----------- | ----------- |
| **Admin Module** | | |
|  | Product Management | Ability to add, edit, and remove products. |
|  | Order Management | Display, status and assign orders for pickup or delivery, integrate with map API. |
|  | Order History | Access to comprehensive order history with search and filter. |
|  | Reporting and Analytics | Dashboard for analytics and report generation. |
|  | User Management | Manage admin user accounts and role-based access. |
| **Client Module** | | |
|  | Account Creation and Management | Mandatory phone number verification, profile management. |
|  | Product Browsing | Interface to browse/search products, view descriptions. |
|  | Shopping Cart | Add multiple products, edit cart items. |
|  | Checkout Process | Secure checkout, payment gateway integration. |
|  | Order Tracking | Real-time tracking, notifications for updates. |
|  | Feedback and Ratings | Rate products and services, provide feedback. |

- [x] **Non-Functional Requirements**: 

| Requirement | Description |
| -------- |  ----------- |
| Performance |  Fast response times, efficient data handling. |
| Security |  Robust data encryption, compliance with regulations. |
| Scalability |  Resource scaling, modular design for updates. |
| Reliability |  High availability, regular backups, failover mechanisms. |
| User Experience |  Intuitive interfaces, responsive design. |
| Accessibility |  Compliance with standards, multilingual support. |
| Legal Compliance |  Adherence to e-commerce regulations, clear terms of service. |
| Integration |  API compatibility, integration with external services. |
| Customer Support |  In-app support, detailed FAQ and help sections. |
| Analytics and Reporting |  Advanced analytics, customizable reports. |

- [x] **Behavioral Diagrams**:

Use Case diagram: 

![alt text](https://github.com/Yaq0ub/ZDeliver/blob/main/images/ZDeliverUseCase.png?raw=true)

Activity diagram:

![alt text](https://github.com/Yaq0ub/ZDeliver/blob/main/images/ZDeliverActivityDiagram.png?raw=true)

Sequence diagram:
![alt text](https://github.com/Yaq0ub/ZDeliver/blob/main/images/ZDeliverSequenceDiagram.png?raw=true)

- [x] **Structural Diagrams**:

Architecture Diagram:
![Architecture Diagram](https://github.com/Yaq0ub/ZDeliver/blob/main/images/ZDeliverArchitecture.png?raw=true)

Class Diagram:
![Class Diagram](https://github.com/Yaq0ub/ZDeliver/blob/main/images/ZDeliverClassDiagram.png?raw=true)

Entity Relationship Diagram:
![Entity Relationship Diagram](https://github.com/Yaq0ub/ZDeliver/blob/main/images/ZDeliverERDiagram.png?raw=true)

- [x] **Data Requirements**:
  - **Data Models**:
    - User model: Stores user profiles with fields for name, email, phone number and order history.
    - Product model: Includes details such as product ID, name, description, and price.
    - Order model: Captures order details including user ID, product IDs, quantities, and status.

  - **Database Requirements**:
    - Database System: Firebase Firestore, optimized for real-time updates and complex queries.
    - Capacity and Performance: Designed to handle up to 10,000 concurrent users and 20,000 daily transactions.
    - Management Tools: Firebase Console for direct management and Firebase Admin SDK for programmatic database control.

  - **Data Exchange Formats**:
    - API Communication: JSON format for RESTful API endpoints.
    - Internal Services Communication: Protobuf for efficient, type-safe data serialization.

  - **Data Integrity and Validation**:
    - Utilizing Firestore security rules for validating data on write operations.
    - Input validation on client and server sides to prevent invalid data submission.

  - **Data Security**:
    - All data encrypted in transit using TLS.
    - Firestore's built-in authentication and authorization for access control.

  - **Data Backup and Recovery**:
    - Daily automated backups with Google Cloud Storage.
    - Manual trigger for on-demand backups before major updates.

  - **Data Archiving and Retention Policy**:
    - Order data archived annually and retained for 7 years to comply with financial regulations.

## 2. Conceptualization and Design
- [ ] **Wireframing and Prototyping**: 

  - **Color Scheme**:
    - #016592, #023A64, #FFFFFF, #000000

  - **Figma Prototype**:
    - [Figma Prototype URL](https://www.figma.com/proto/VaPsthHw7DhzHLurKYNm2G/ZDeliver?type=design&node-id=145-755&t=vGH6o7lJibQqKPXz-0&scaling=scale-down&page-id=0%3A1&starting-point-node-id=145%3A755)

    - ![Wireframe](https://github.com/Yaq0ub/ZDeliver/blob/main/images/ZDeliverWireframe.png?raw=true)

- [x] **Tech Stack Selection**: react-native with expo and firebase

## 3. Environment Setup and Standards
- [ ] **Development Environment Setup**: Configure IDEs, SDKs, and tools.
- [x] **Version Control**: Set up a version control system like Git.
- [x] **Coding Standards**: Establish coding standards for consistency.

# React Native App Development Coding Standards

## 1. Introduction

This document outlines the coding standards and best practices for our React Native application development team. It aims to ensure consistency, maintainability, and high quality across the application's codebase, facilitating efficient collaboration and project scalability.

## 2. Project Structure

- **Components**: Organized into feature-based directories within `components`.
- **Screens**: Stored in `app/`, grouped by application flow.
- **Utilities**: Reusable logic, helpers, and utilities in `utils`.
- **Navigation**: File based routing in `app`.
- **Assets**: Static assets like images and fonts in the `assets` directory.
- **Constants**: Centralized management of application-wide constants in the `constants` directory

## 3. Naming Conventions

- **Components and Classes**: PascalCase. Example: `UserProfileScreen`.
- **Variables and Functions**: camelCase. Example: `fetchUserData`.
- **Constants**: UPPER_SNAKE_CASE. Example: `API_ENDPOINT`.
- **Hooks**: Prefix with `use`. Example: `useUserProfile`.

## 4. Coding Practices

- Prefer functional components and hooks over class components.
- Utilize PropTypes for prop type checking.
- Ensure state management immutability.
- Handle API call errors gracefully.
- Follow the DRY principle to avoid code redundancy.

## 5. Styling

- Define component styles with `StyleSheet.create`.
- Use flexbox for responsive design.
- Global stylesheet for common styles, colors, and fonts.

## 6. Testing

- **Unit Tests**: Jest for individual components/functions.
- **Integration Tests**: React Testing Library for simulating user interactions.
- **Mocking**: Mock external modules/APIs during testing.

## 7. Performance Optimization

- Use `React.memo` for preventing unnecessary re-renders.
- Optimize with `useMemo` and `useCallback` hooks.
- Optimize image assets (resizing, compressing).

## 8. Accessibility

- Accessible interactive elements with meaningful labels.
- Screen reader testing for visually impaired user accessibility.
- Sufficient contrast ratios for text/background colors.

## 9. Version Control

- **Branch Naming**: Descriptive names like `feature/feature-name`, `bugfix/bug-description`.
- **Commit Messages**: Consistent format: `<type>: <description>`. Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`.

## 10. CI/CD

- CI/CD pipeline for automated builds and tests.
- Different environments (development, staging, production) for staged deployments.

## 11. Security Best Practices

- Use HTTPS for external data exchanges.
- Secure storage of sensitive information.
- Regular updates for dependencies to mitigate vulnerabilities.

## Conclusion

Following these coding standards is crucial for developing a robust, scalable, and maintainable React Native application. All team members are encouraged to adhere to these guidelines and contribute to the ongoing improvement of our codebase.


## 4. Development Methodology
- [ ] **Agile Methodology**: Implement an Agile framework.
- [ ] **Sprint Planning**: Plan sprints with specific goals.
- [ ] **Daily Standups**: Conduct meetings to track progress.

## 5. Development
- [ ] **Component-Based Development**: Build reusable components.
- [ ] **API Integration**: Develop or integrate APIs.
- [ ] **Unit Testing**: Execute unit tests for components.
- [ ] **Code Reviews**: Perform regular code reviews.

## 6. Testing
- [ ] **Integration Testing**: Ensure components work together.
- [ ] **UI/UX Testing**: Validate against designed UI/UX.
- [ ] **Performance Testing**: Test performance under various conditions.
- [ ] **Cross-Platform Testing**: Ensure compatibility across devices.

## 7. Deployment
- [ ] **CI/CD Pipeline**: Set up CI/CD pipelines.
- [ ] **Beta Testing**: Release for beta testing and feedback.
- [ ] **App Store Submission**: Prepare for app store submission.

## 8. Post-Deployment
- [ ] **Monitoring and Analytics**: Implement monitoring tools.
- [ ] **User Feedback Collection**: Gather user feedback.
- [ ] **Maintenance and Updates**: Regularly update the app.

## 9. Quality Assurance and Professional Standards
- [ ] **Code Quality Tools**: Use tools like ESLint, SonarQube.
- [ ] **Security Best Practices**: Implement security measures.
- [ ] **Accessibility Compliance**: Ensure app accessibility.

## 10. Documentation and Knowledge Transfer
- [ ] **Technical Documentation**: Create comprehensive documentation.
- [ ] **User Manuals**: Develop manuals or guides for users.

## 11. Continuous Improvement
- [ ] **Retrospectives**: Conduct retrospective meetings.
- [ ] **Keeping Up-to-Date**: Stay updated with trends and updates.

## 12. Training and Skills Development
- [ ] **Team Training**: Encourage continuous learning.
- [ ] **Knowledge Sharing Sessions**: Organize knowledge sharing within the team.
