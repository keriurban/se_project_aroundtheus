export default class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
    this._avatarElement = document.querySelector(avatarSelector);

    this._userId = null; // Initialize user ID

    // Log an error if any of the elements are not found
    if (!this._nameElement || !this._jobElement || !this._avatarElement) {
      console.error("One or more user info elements could not be found.");
    }
  }

  /**
   * Get user information from the page.
   * @returns {Object} User data with `name` and `job`.
   */
  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      job: this._jobElement.textContent,
    };
  }

  /**
   * Set user information on the page and store user ID.
   * @param {Object} userInfo - Contains `name`, `job`, `avatar`, and `id`.
   */
  setUserInfo({ name, job, avatar, id }) {
    if (name) this._nameElement.textContent = name;
    if (job) this._jobElement.textContent = job;
    if (avatar) this._avatarElement.src = avatar;
    if (id) this._userId = id; // Store user ID
  }

  /**
   * Get the stored user ID.
   * @returns {string|null} User ID or null if not set.
   */
  getUserId() {
    return this._userId;
  }
}
